#!/usr/bin/env bash
set -euo pipefail

err() {
  echo "Error: $*" >&2
  exit 1
}

info() {
  echo "==> $*"
}

require_root_or_sudo() {
  if [[ "${EUID:-$(id -u)}" -eq 0 ]]; then
    SUDO=""
  elif command -v sudo >/dev/null 2>&1; then
    SUDO="sudo"
  else
    err "This script needs root privileges for package installation. Please run as root or install sudo."
  fi
}

check_command() {
  command -v "$1" >/dev/null 2>&1
}

install_docker_official() {
  if check_command docker; then
    info "Docker is already installed."
    return
  fi

  require_root_or_sudo

  [[ -f /etc/os-release ]] || err "/etc/os-release not found; unsupported Linux distribution."
  # shellcheck disable=SC1091
  source /etc/os-release

  case "${ID:-}" in
    ubuntu|debian)
      info "Docker is not installed. Installing Docker using Docker's official apt repository..."

      $SUDO apt-get update
      $SUDO apt-get install -y ca-certificates curl gnupg

      $SUDO install -m 0755 -d /etc/apt/keyrings

      if [[ "${ID:-}" == "ubuntu" ]]; then
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
          $SUDO gpg --dearmor -o /etc/apt/keyrings/docker.gpg
        $SUDO chmod a+r /etc/apt/keyrings/docker.gpg

        echo \
          "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu ${VERSION_CODENAME} stable" | \
          $SUDO tee /etc/apt/sources.list.d/docker.list >/dev/null
      else
        curl -fsSL https://download.docker.com/linux/debian/gpg | \
          $SUDO gpg --dearmor -o /etc/apt/keyrings/docker.gpg
        $SUDO chmod a+r /etc/apt/keyrings/docker.gpg

        echo \
          "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian ${VERSION_CODENAME} stable" | \
          $SUDO tee /etc/apt/sources.list.d/docker.list >/dev/null
      fi

      $SUDO apt-get update
      $SUDO apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
      $SUDO systemctl enable --now docker
      ;;
    fedora)
      info "Docker is not installed. Installing Docker using Docker's official dnf repository..."

      $SUDO dnf -y install dnf-plugins-core
      $SUDO dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
      $SUDO dnf -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
      $SUDO systemctl enable --now docker
      ;;
    *)
      err "Unsupported distribution for automatic Docker install: ${ID:-unknown}. Please install Docker from https://docs.docker.com/engine/install/ and re-run this script."
      ;;
  esac

  check_command docker || err "Docker installation appears to have failed."
  info "Docker installed successfully."
}

ensure_openssl() {
  check_command openssl || err "openssl is required but not installed."
}

ensure_docker_access() {
  if docker info >/dev/null 2>&1; then
    return
  fi

  if [[ "${EUID:-$(id -u)}" -eq 0 ]]; then
    return
  fi

  cat >&2 <<'EOF'
Docker is installed, but the current user cannot access the Docker daemon.

You may need one of these:
  sudo usermod -aG docker "$USER"
  newgrp docker

Then log out and back in, or re-run this script with sudo.
EOF
  exit 1
}

prompt_nonempty() {
  local prompt="$1"
  local value=""
  while true; do
    read -r -p "$prompt" value
    if [[ -n "$value" ]]; then
      printf '%s' "$value"
      return
    fi
    echo "Value cannot be empty."
  done
}

prompt_password() {
  local p1=""
  local p2=""
  while true; do
    read -r -s -p "Enter password: " p1
    echo
    [[ -n "$p1" ]] || { echo "Password cannot be empty."; continue; }

    read -r -s -p "Confirm password: " p2
    echo

    if [[ "$p1" != "$p2" ]]; then
      echo "Passwords do not match. Please try again."
      continue
    fi

    PASSWORD="$p1"
    return
  done
}

validate_setup_dir() {
  local dir="$1"

  if [[ -e "$dir" ]]; then
    [[ -d "$dir" ]] || err "Path exists but is not a directory: $dir"

    if [[ -n "$(find "$dir" -mindepth 1 -maxdepth 1 -print -quit 2>/dev/null)" ]]; then
      err "Directory already exists and is not empty: $dir"
    fi
  else
    mkdir -p "$dir"
  fi
}

generate_password_hash() {
  local password="$1"
  local hash

  info "Generating password hash with Authelia..."
  hash="$(docker run --rm authelia/authelia:latest \
    authelia crypto hash generate argon2 --password "$password" \
    | awk -F': ' '/^Digest:/ {print $2}' \
    | tail -n1)"

  [[ -n "$hash" ]] || err "Failed to generate Authelia password hash."
  printf '%s' "$hash"
}

main() {
  install_docker_official
  ensure_openssl
  ensure_docker_access

  echo
  SETUP_DIR="$(prompt_nonempty 'Enter the folder to create the Authelia setup in: ')"
  validate_setup_dir "$SETUP_DIR"

  DOMAIN="$(prompt_nonempty 'Enter your base domain (example: gamer.example.org): ')"
  USERNAME="$(prompt_nonempty 'Enter Authelia username: ')"
  EMAIL="$(prompt_nonempty 'Enter Authelia email: ')"
  prompt_password

  PASSWORD_HASH="$(generate_password_hash "$PASSWORD")"
  unset PASSWORD

  JWT_SECRET="$(openssl rand -hex 32)"
  SESSION_SECRET="$(openssl rand -hex 32)"
  STORAGE_KEY="$(openssl rand -hex 32)"

  mkdir -p "$SETUP_DIR/config"

  cat > "$SETUP_DIR/docker-compose.yml" <<'EOF'
services:
  authelia:
    image: authelia/authelia:4
    container_name: authelia
    volumes:
      - ./config:/config
    ports:
      - 9991:9991
    restart: unless-stopped
EOF

  cat > "$SETUP_DIR/config/configuration.yml" <<EOF
server:
  address: tcp://0.0.0.0:9991

log:
  level: info

theme: dark

identity_validation:
  reset_password:
    jwt_secret: "$JWT_SECRET"

authentication_backend:
  file:
    path: /config/users_database.yml

access_control:
  default_policy: deny
  rules:
    - domain: coder.$DOMAIN
      policy: one_factor

session:
  secret: "$SESSION_SECRET"
  cookies:
    - domain: $DOMAIN
      authelia_url: https://auth.$DOMAIN
      default_redirection_url: https://coder.$DOMAIN

storage:
  encryption_key: "$STORAGE_KEY"
  local:
    path: /config/db.sqlite3

notifier:
  filesystem:
    filename: /config/notification.txt
EOF

  cat > "$SETUP_DIR/config/users_database.yml" <<EOF
users:
  $USERNAME:
    displayname: "$USERNAME"
    password: "$PASSWORD_HASH"
    email: $EMAIL
    groups:
      - admins
EOF

  echo
  info "Authelia files created successfully in: $SETUP_DIR"
  echo
  echo "Created:"
  echo "  $SETUP_DIR/docker-compose.yml"
  echo "  $SETUP_DIR/config/configuration.yml"
  echo "  $SETUP_DIR/config/users_database.yml"
  echo
  echo "Next steps:"
  echo "  cd \"$SETUP_DIR\""
  echo "  docker compose up -d"
}

main "$@"

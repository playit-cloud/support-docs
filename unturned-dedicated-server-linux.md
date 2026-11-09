+++
title = "Setting up an Unturned server on Linux"
tags = ["Unturned", "guide", "linux"]
description_file = "descriptions/unturned-dedicated-server-linux.txt"
+++

## Installing SteamCMD

### Server

For this to work, we will be using [SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD). We will be using **Debian 13** for this guide, with SteamCMD already installed.

If you need to install SteamCMD, follow [Valve's Linux instructions](https://developer.valvesoftware.com/wiki/SteamCMD#Linux) for your distribution. The commands below use `/usr/games/steamcmd`; replace this with your SteamCMD path if yours is different.

Run the game server as a normal Linux user on an x86-64 server. You will also need a [playit account](https://playit.gg/) and a Steam account eligible to create a Game Server Login Token. The **Unturned** tunnel preset is available on the free plan.

We will use `+LanServer` and connect directly through playit. The server won't appear in Unturned's Internet server list.

### Setup

You need a place to store the server. Create a new directory, for example `unturned`:

```bash
mkdir -p ~/unturned
```

Start installing the server from SteamCMD using this command:

```bash
/usr/games/steamcmd +force_install_dir ~/unturned +login anonymous +app_update 1110390 validate +quit
```

This will install the Unturned Dedicated Server inside `~/unturned`. Wait for `Success! App '1110390' fully installed.`

## Starting the server

```bash
cd ~/unturned
chmod +x ServerHelper.sh Unturned_Headless.x86_64
./ServerHelper.sh +LanServer/UnturnedServer
```

Inside the `unturned` folder, run `ServerHelper.sh` as shown above. This sets the Steam library path and starts the server without a desktop environment.

`UnturnedServer` is the server ID. Settings and savedata will be stored in `~/unturned/Servers/UnturnedServer`. Keep the same ID each time you start it.

Wait for **Loading level: 100%**, then type `Shutdown` in the server console and press Enter. This saves the world and stops the server before you edit its settings.

### Server configuration

Inside `Servers/UnturnedServer/Server`, you will find `Commands.dat`. Open it with:

```bash
nano ~/unturned/Servers/UnturnedServer/Server/Commands.dat
```

Add these lines, replacing existing entries for the same settings:

```text
Name Unturned via playit.gg
Map PEI
Port 27015
MaxPlayers 8
Perspective Both
```

You can change the name and player limit. `PEI` is included with the server and doesn't require Workshop downloads.

For a private game, add a join password on its own line:

```text
Password YourUniqueServerPassword
```

Use a password you don't use for another account. Players will need it when joining.

Other settings are in `~/unturned/Servers/UnturnedServer/Config.txt`. Leave **Use_FakeIP** at its default, `False`, for this tunnel setup. Linux paths and filenames are case sensitive.

### Game Server Login Token (GSLT)

A GSLT logs your dedicated server into Steam. It is separate from the password players enter to join and from the Server Code in the console. Keep `+LanServer` in the startup command; add a token before testing a public-IP connection through playit.

Open [Steam Game Server Account Management](https://steamcommunity.com/dev/managegameservers) in your browser and sign in. Steam lists the account requirements on that page.

Create a game server account using:

```text
App ID: 304930
Memo: Unturned playit server
```

Use **304930**, the Unturned game's app ID. The memo can be anything you want; it's just a label to help you recognize the server. If you already have a valid Unturned token for this server, you can use it.

{{< image src="post-img/unturned-windows-gslt-create.jpg" alt="Steam game server account creation form with Unturned app ID 304930 and an example memo" >}}

Click **Create**, then copy the generated token. With the server stopped, add it to `Commands.dat`:

```text
Name Unturned via playit.gg
Map PEI
Port 27015
MaxPlayers 8
Perspective Both
GSLT PASTE_YOUR_TOKEN_HERE
```

Replace `PASTE_YOUR_TOKEN_HERE` with your token, keeping it on one line. Remove any older `GSLT` entry. Keep the token private and give each running server its own token. Friends only need the playit address, first port, and optional join password.

Save in nano with **Ctrl+O**, press **Enter**, then exit with **Ctrl+X**.

## Keeping the server running

Use `tmux` so the console stays available after you disconnect from SSH. On Debian, install it if needed:

```bash
sudo apt update
sudo apt install tmux
```

Create a session and start the server:

```bash
tmux new -s unturned
cd ~/unturned
./ServerHelper.sh +LanServer/UnturnedServer
```

Wait for **Loading level: 100%**. To leave the server running, press **Ctrl+B**, release both keys, then press **D**. You can now disconnect from SSH.

Reconnect to the console later with:

```bash
tmux attach -t unturned
```

## Create the tunnel

Install and claim a playit agent on the **same Linux computer** as the game server. See {{< link "run-on-linux" >}} and {{< link "host-247-with-playit" >}} for the Linux agent setup and keeping it running.

Open [your tunnels](https://playit.gg/account/tunnels), choose **new tunnel**, and use:

1. **Name:** Unturned, or another name you prefer.
2. **Tunnel Type:** Unturned.
3. **Public Endpoint:** Playit Network → Global Anycast (free).
4. **Agent:** the agent running on your Linux server.
5. **Origin Config:** the values below.

```text
Local IP: 127.0.0.1
Local Port: 27015
Proxy Protocol: None
```

{{< image src="post-img/unturned-linux-tunnel-setup.png" alt="New Tunnel form with name Unturned, Unturned preset, free Global Anycast endpoint, Debian 13 Server agent, and origin 127.0.0.1:27015 with Proxy Protocol None" >}}

Click **Next**, then **Create Tunnel**. Keep both the agent and dedicated server running.

The tunnel uses two consecutive public ports. In this example, they are `6644` and `6645`:

| Purpose | Public port in this example | Local port |
| --- | --- | --- |
| Server query / Connect Directly | 6644 | 27015 |
| Game traffic | 6645 | 27016 |

Your assigned public ports will be different. Keep the local port at `27015` in both playit and `Commands.dat`; you don't need to change the server's ports to match the public ports.

## Joining the server

Copy the tunnel's **numeric IPv4 address** and the **first** port in its range.

{{< image src="post-img/unturned-windows-tunnel.jpg" alt="Unturned tunnel showing its numeric IPv4 address and two consecutive public ports" >}}

Open Unturned and choose **Play → Connect Directly**.

{{< image src="post-img/unturned-windows-connect-menu.jpg" alt="Connect Directly in Unturned's Play menu" >}}

For the example shown, enter:

```text
Host or Server Code: 147.185.221.217
Port: 6644
Password: the server password, if you set one
```

Replace the IP and port with your own tunnel's values.

{{< image src="post-img/unturned-windows-direct-connect.jpg" alt="Unturned Connect Directly filled with the example tunnel IPv4 address and first port" >}}

Click **Connect**, check the server name and map, then click **Join**. Once the world loads, your server is ready to play.

{{< image src="post-img/unturned-windows-gameplay.jpg" alt="Playing on an Unturned server after joining through the playit tunnel" >}}

Share the public IPv4 address, first port, and optional join password with friends. Keep the Linux server and playit agent running while anyone is playing.

## Save, stop, and update

Attach to the console with `tmux attach -t unturned`. Type `Save` to save without stopping, or `Shutdown` to save and close the server. Unturned has no built-in autosave, so save regularly.

Back up `~/unturned/Servers/UnturnedServer` while the server is stopped. To update the server, stop it first and run:

```bash
/usr/games/steamcmd +force_install_dir ~/unturned +login anonymous +app_update 1110390 validate +quit
```

Start it again with the same server ID. If the original tmux session is still open at a shell prompt, reattach and run the startup command there. Otherwise create a new session as shown above.

## Troubleshooting

### The server won't start

Run it from `~/unturned`, where `ServerHelper.sh` is located. If you see **Permission denied**, repeat the `chmod +x` command. Use the helper instead of launching the binary directly so it sets the Steam library path.

Read `~/unturned/Logs/Server_UnturnedServer.log` for startup errors:

```bash
tail -n 50 ~/unturned/Logs/Server_UnturnedServer.log
```

Headless startup can print shader warnings. Check whether it reaches **Loading level: 100%** before treating those warnings as a startup failure.

### The tunnel doesn't respond

Check that the Linux agent is online and selected on this tunnel. Use `127.0.0.1`, local port `27015`, and Proxy Protocol **None**. Confirm the server finished loading and the tunnel covers both consecutive ports.

On the Linux server, check the UDP listeners:

```bash
ss -lunp | grep -E ':(27015|27016)[[:space:]]'
```

Check any local firewall rules that could block the agent's connection to the game server. Router port forwarding isn't needed for this playit setup.

### Clicking Connect with the hostname does nothing

Try the tunnel's numeric IPv4 address. In our Windows client test with Unturned 3.26.3.13, the hostname resolved to IPv6 first and the client logged `Unable to parse resolved address`. Changing the operating system hosting the dedicated server doesn't change how that client parses hostnames.

### The server details say a login token is required

Stop the server, check the `GSLT` line in `Servers/UnturnedServer/Server/Commands.dat`, and restart. The token must be for app ID **304930**, be valid, and not be used by another running server. Cancel the old details screen and connect again.

Keep `+LanServer` in the command. The Internet server list isn't used by this guide. For token details, see the [official Unturned GSLT documentation](https://docs.smartlydressedgames.com/en/stable/servers/game-server-login-tokens.html).

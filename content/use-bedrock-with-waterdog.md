+++
title = "Setting up a Bedrock server with WaterdogPE and playit"
tags = ["Minecraft", "Guide", "Networking", "WaterdogPE"]
description_file = "descriptions/use-bedrock-with-waterdog.txt"
+++

This guide connects Minecraft Bedrock players to Microsoft's vanilla Bedrock Dedicated Server through WaterdogPE and a playit NetherNet tunnel.

The vanilla server has built-in NetherNet signaling, but it does not provide NXS endpoint or token settings. WaterdogPE registers with playit's external signaling service (NXS) and forwards players to the vanilla server.

The connection follows this path:

```text
Bedrock player -> playit NetherNet tunnel -> WaterdogPE -> vanilla Bedrock server
```

You do not need Geyser or Floodgate for this setup. WaterdogPE itself provides the NetherNet proxy; the StarGate messaging plugin is not required.

## Before you start

You need:

- [Bedrock Dedicated Server from Microsoft](https://www.minecraft.net/en-us/download/server/bedrock).
- A recent [WaterdogPE release](https://github.com/WaterdogPE/WaterdogPE/releases) with NXS support.
- Java 17 or newer to run WaterdogPE.
- An up-to-date [playit agent](https://playit.gg/download) with support for NetherNet through NXS.
- [Playit Premium](https://playit.gg/premium), which is required to create a NetherNet tunnel.

This example runs all three programs on one Windows machine. It was tested with Bedrock Dedicated Server 26.60.6 and WaterdogPE 2.0.4.

The WaterdogPE configuration below uses `listener.transport` and the nested `nethernet.signaling` section. Update WaterdogPE if your generated configuration does not contain these settings.

## 1. Configure the vanilla Bedrock server

Extract Microsoft's server ZIP into its own folder. Open `server.properties` and set these properties:

```properties
server-name=Vanilla Bedrock via Playit
server-ip=127.0.0.1
server-port=19142
server-portv6=19143
server-udp-ports=19142
transport=nethernet
enable-lan-visibility=false
online-mode=false
allow-list=false
```

Keep the other properties in the file.

The backend listens on `127.0.0.1:19142`. WaterdogPE will use port `19132`, so the two programs need different local ports.

`server-udp-ports=19142` gives the backend a fixed UDP port for NetherNet. With `transport=nethernet`, the server uses `server-port` for its dual-stack signaling listener and ignores `server-portv6`.

WaterdogPE authenticates players with Xbox Live. The backend must use `online-mode=false` to accept those proxied players.

Keep `server-ip=127.0.0.1` so players cannot bypass the proxy. Do not create a public tunnel to the backend.

Bedrock Dedicated Server refuses to start with an allowlist while online authentication is disabled. Set `allow-list=false` on this backend.

Start the server from its folder:

```powershell
.\bedrock_server.exe
```

Wait for the `Server started` message.

## 2. Prepare WaterdogPE

Place `Waterdog.jar` in a separate folder. Run it once to generate `config.yml`:

```powershell
java -Xms256M -Xmx1G -Dio.netty.tryReflectionSetAccessible=true --add-opens java.base/jdk.internal.misc=ALL-UNNAMED -jar Waterdog.jar
```

Enter `end` in the WaterdogPE console to stop it before editing the configuration.

## 3. Create a NetherNet tunnel

Start the playit agent and confirm it is connected to your account.

Create a tunnel in the [tunnel dashboard](https://playit.gg/account/tunnels) with these settings:

- **Tunnel type:** Minecraft Bedrock (NetherNet).
- **Agent:** the agent running on this machine.
- **Local IP:** `127.0.0.1`.
- **Local port:** `19132`, the WaterdogPE port.

The tunnel must point to WaterdogPE, rather than the vanilla server's port `19142`.

Get the **NetherNet token** from the tunnel page. Also copy its hostname, public IPv4 address, and allocated UDP port.

If you reuse an existing tunnel, stop its previous NXS host, such as Geyser. Use this token for the WaterdogPE instance serving the tunnel.

## 4. Configure WaterdogPE

Open WaterdogPE's `config.yml`. Merge these settings into the generated sections, keeping the other settings and `config_version` value.

WaterdogPE uses underscores in these configuration keys.

```yaml
listener:
  motd: Vanilla Bedrock via Waterdog and Playit
  name: Vanilla Bedrock Server
  priorities:
    - vanilla
  host: 0.0.0.0:19132
  transport: nethernet
  max_players: 10

servers:
  vanilla:
    address: 127.0.0.1:19142
    public_address: 127.0.0.1:19142
    server_type: nethernet

nethernet:
  webrtc_port: 0
  signaling:
    mode: nxs
    advertise_addresses:
      - "203.0.113.10:44079"
    stun_discovery: false
    nxs:
      token: 'YOUR_NETHERNET_TOKEN'
      endpoint: https://nethernet.playit.gg

online_mode: true
upstream_encryption: true
use_login_extras: false
enable_edu_features: false
```

Replace `YOUR_NETHERNET_TOKEN` with the token from your tunnel page. Keep it private.

Replace `203.0.113.10:44079` with the tunnel's **public IPv4 address and allocated UDP port**. The example address will not work as written.

Check these settings:

- `listener.host` binds WaterdogPE to local port `19132`, matching the tunnel's local port.
- `listener.transport: nethernet` accepts NetherNet connections.
- `nethernet.webrtc_port: 0` uses the listener port for UDP when the transport is `nethernet`.
- `nethernet.signaling.mode: nxs` registers WaterdogPE with playit's signaling service.
- `advertise_addresses` contains the tunnel's public UDP endpoint. It belongs directly under `nethernet.signaling`.
- `servers.vanilla.address` points to the vanilla server's local signaling port.
- `server_type: nethernet` uses NetherNet between WaterdogPE and the vanilla server too.
- `listener.priorities` names the backend entry, `vanilla`.
- `online_mode: true` keeps Xbox Live authentication enabled at the proxy.
- `use_login_extras: false` avoids adding proxy-specific login fields to the vanilla server's login data.
- `enable_edu_features: false` keeps Education Edition features disabled for the vanilla server.

The backend's `online-mode` property and WaterdogPE's `online_mode` setting serve different purposes. Keep the backend setting `false` and the proxy setting `true`.

## 5. Start WaterdogPE and connect

Keep the vanilla server and playit agent running. Start WaterdogPE with the Java command from step 2.

Look for messages similar to:

```text
NetherNet registers with NXS, with WebRTC on udp/19132
Registered with the external signaling service. Players can join at https://your-tunnel.tun.ply.gg:19132
```

In Minecraft Bedrock, add a server using:

- **Server address:** the tunnel's hostname, such as `your-tunnel.tun.ply.gg`.
- **Port:** `19132`.

Enter the hostname without `https://`. Use the join address printed by WaterdogPE if it differs from the example.

The allocated UDP port, such as `44079`, belongs in `advertise_addresses`. Players enter signaling port `19132`, not that allocated port or backend port `19142`.

After joining, WaterdogPE should log both an upstream player connection and a downstream connection to `vanilla`.

## Troubleshooting

### WaterdogPE registers, but players get "Door"

Confirm that the playit agent supports NetherNet through NXS. Check that the tunnel forwards to WaterdogPE's UDP port `19132`.

Check the public IPv4 address and allocated UDP port in `advertise_addresses`. Keep the listener bound to `0.0.0.0`, rather than loopback.

### Players reach WaterdogPE but cannot join the vanilla server

Confirm that the backend is running on `127.0.0.1:19142`. Check that `servers.vanilla.address` uses the same port.

Keep the backend's `transport=nethernet` and `online-mode=false`. Keep WaterdogPE's `online_mode: true` and `use_login_extras: false`.

Check that both server versions support the player's Bedrock version. Read both consoles for the downstream disconnect reason.

### WaterdogPE cannot parse the backend configuration

Keep `public_address` as a valid `host:port`, such as `127.0.0.1:19142`. Do not set it to an empty string.

### The vanilla server exits with an allowlist error

Set `allow-list=false` on the loopback-only backend. This server cannot combine its allowlist with `online-mode=false`.

For more information about WaterdogPE, see its [setup documentation](https://docs.waterdog.dev/waterdogpe-setup/starting-waterdog).

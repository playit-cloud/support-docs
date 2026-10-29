+++
title = "Setting up a Bedrock server with WaterdogPE and playit"
tags = ["minecraft", "guide", "networking", "waterdogpe"]
description_file = "descriptions/use-bedrock-with-waterdog.txt"
+++

Let friends join your Minecraft Bedrock Dedicated Server through playit. Install WaterdogPE alongside your server to connect it to your NetherNet tunnel.

Follow the steps below on the Windows computer that will run your server, WaterdogPE, and the playit agent.

## Before you start

You need:

- [Bedrock Dedicated Server from Microsoft](https://www.minecraft.net/en-us/download/server/bedrock).
- A recent [WaterdogPE release](https://github.com/WaterdogPE/WaterdogPE/releases) with NXS support.
- Java 17 or newer to run WaterdogPE.
- An up-to-date [playit agent](https://playit.gg/download) with support for NetherNet through NXS.
- [Playit Premium](https://playit.gg/premium), which is required to create a NetherNet tunnel.

Download the latest versions of Bedrock Dedicated Server and WaterdogPE. If your WaterdogPE configuration is missing the settings below, update WaterdogPE before continuing.

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

These settings put your Bedrock server on `127.0.0.1:19142`. Keep port `19132` available for WaterdogPE.

Keep `server-udp-ports` set to `19142` so WaterdogPE can reach your server at a fixed port.

Set `online-mode=false` on your Bedrock server. WaterdogPE will check players' Xbox Live accounts before letting them join.

Keep `server-ip=127.0.0.1` so players must connect through WaterdogPE. Point your playit tunnel to WaterdogPE, not this server.

Keep `allow-list=false` on your Bedrock server. Its built-in allowlist requires online authentication, which WaterdogPE handles in this setup.

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
- **Proxy Protocol:** None.

{{< image src="post-img/minecraft-nethernet-tunnel-type.png" alt="Select Minecraft Bedrock (NetherNet) for the WaterdogPE tunnel" >}}

The tunnel must point to WaterdogPE, rather than the vanilla server's port `19142`.

Get the **NetherNet token** from the tunnel page. Also copy its hostname, public IPv4 address, and allocated UDP port.

{{< image src="post-img/minecraft-nethernet-origin.png" alt="NetherNet origin forwarding to local UDP port 19132 with Proxy Protocol set to None" >}}

If you are moving an existing tunnel from Geyser to WaterdogPE, stop Geyser before starting WaterdogPE with that tunnel's token.

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
- `listener.priorities` names your server entry, `vanilla`.
- `online_mode: true` keeps Xbox Live authentication enabled at the proxy.
- Keep `use_login_extras: false` when connecting to Microsoft's Bedrock Dedicated Server.
- `enable_edu_features: false` keeps Education Edition features disabled for the vanilla server.

Keep `online-mode=false` in your Bedrock server's `server.properties` and `online_mode: true` in WaterdogPE's `config.yml`.

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

The allocated UDP port, such as `44079`, belongs in `advertise_addresses`. Players enter signaling port `19132`, not that allocated port or your Bedrock server's local port `19142`.

Join the server to confirm that you can enter your world. Share the tunnel hostname and port `19132` with your friends.

## Troubleshooting

### You get a "Door" error when joining

Update the playit agent. Check that your tunnel's local port is `19132` and that WaterdogPE is running.

Check the public IPv4 address and allocated UDP port in `advertise_addresses`. Keep the listener bound to `0.0.0.0`, rather than loopback.

### You connect to WaterdogPE but cannot enter your world

Check that your Bedrock server is running on `127.0.0.1:19142`. Set `servers.vanilla.address` in WaterdogPE to the same address and port.

Keep `transport=nethernet` and `online-mode=false` in your Bedrock server's `server.properties`. Keep `online_mode: true` and `use_login_extras: false` in WaterdogPE.

Update your Bedrock server and WaterdogPE to versions that support your Minecraft client. Check both consoles for a disconnect message.

### WaterdogPE reports an invalid server address

Keep `public_address` as a valid `host:port`, such as `127.0.0.1:19142`. Do not set it to an empty string.

### The vanilla server exits with an allowlist error

Set `allow-list=false` in your Bedrock server's `server.properties`. Keep `online_mode: true` in WaterdogPE so players still authenticate with Xbox Live.

For more information about WaterdogPE, see its [setup documentation](https://docs.waterdog.dev/waterdogpe-setup/starting-waterdog).

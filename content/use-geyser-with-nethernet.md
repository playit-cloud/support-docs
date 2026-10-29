+++
title = "Setting up NetherNet with Geyser and playit"
tags = ["minecraft", "guide", "geysermc", "networking"]
description_file = "descriptions/use-geyser-with-nethernet.txt"
+++

Let Minecraft Bedrock players join your Java Edition server with Geyser and a playit NetherNet tunnel. You do not need to forward ports on your router.

For a vanilla Bedrock server, follow {{< link "use-bedrock-with-waterdog.md" >}} instead.

## Before you start

You need:

- A working Minecraft Java server supported by your Geyser version.
- An up-to-date [Geyser installation](https://geysermc.org/wiki/geyser/setup/) with NetherNet and NXS support.
- An up-to-date [playit agent](https://playit.gg/download) with support for NetherNet through NXS.
- [Playit Premium](https://playit.gg/premium), which is required to create a NetherNet tunnel.

For Paper, follow the installation steps below. If you use another Geyser platform, install its matching Geyser package and apply the same Bedrock settings.

## 1. Install Geyser and Floodgate

For Paper, download `Geyser-Spigot.jar` from [Geyser's downloads page](https://geysermc.org/download/?project=geyser). Place it in your server's `plugins` folder.

To let Bedrock players join without a Java Edition account, install [Floodgate](https://geysermc.org/wiki/floodgate/setup/) on the server too.

Start the server once to generate the configuration files. Stop the server before editing them.

Keep `online-mode=true` in the Java server's `server.properties`. Floodgate handles authentication for Bedrock players.

## 2. Create a NetherNet tunnel

Start the playit agent and confirm it is connected to your account.

In the [tunnel dashboard](https://playit.gg/account/tunnels), create a tunnel with these settings:

- **Tunnel type:** Minecraft Bedrock (NetherNet).
- **Agent:** the agent that can reach your Geyser server.
- **Local IP:** `127.0.0.1` when the agent and Geyser run on the same machine.
- **Local port:** `19132`.
- **Proxy Protocol:** None.

{{< image src="post-img/minecraft-nethernet-tunnel-type.png" alt="Select Minecraft Bedrock (NetherNet) when creating the tunnel" >}}

If Geyser runs in a container or on another machine, use an address the agent can reach. Allow UDP traffic from the agent to Geyser's local port.

Open the tunnel page after creating it. Get the **NetherNet token** from the tunnel page.

Copy the tunnel's **hostname** for players to use when joining. Playit handles the public connection address automatically.

{{< image src="post-img/minecraft-nethernet-origin.png" alt="NetherNet origin forwarding to local UDP port 19132 with Proxy Protocol set to None" >}}

## 3. Configure Geyser

On Paper, open `plugins/Geyser-Spigot/config.yml`. On Fabric, open `config/Geyser-Fabric/config.yml`.

Merge the following settings into the existing `bedrock:` and `java:` sections. Keep the other settings in your file. If you previously set `bedrock.signaling.advertise-addresses`, remove that setting.

```yaml
bedrock:
  address: 0.0.0.0
  port: 19132
  webrtc-port: 0
  transport: nethernet
  clone-remote-port: false

  signaling:
    mode: nxs
    stun-discovery: false

    nxs:
      token: 'YOUR_NETHERNET_TOKEN'
      endpoint: https://nethernet.playit.gg

java:
  auth-type: floodgate
```

Replace `YOUR_NETHERNET_TOKEN` with the token from your tunnel page. Keep the token private.

Check these settings:

- `address: 0.0.0.0` lets Geyser's NetherNet listener accept connections. Do not bind Geyser to `127.0.0.1`, even when the agent runs locally.
- `port: 19132` matches the tunnel's **local port**. It does not need to match playit's allocated UDP port.
- `webrtc-port: 0` makes NetherNet use the UDP port selected by `port`.
- `transport: nethernet` lets current Bedrock clients connect to your server.
- `clone-remote-port: false` keeps the Geyser port separate from the Java server port.
- `signaling.mode: nxs` registers Geyser with playit's external signaling service.
- `stun-discovery: false` keeps automatic address discovery disabled.
- `java.auth-type: floodgate` uses the Floodgate plugin installed earlier.

If you are not using Floodgate, keep `java.auth-type: online`. Bedrock players will need to authenticate with a Java Edition account.

## 4. Restart and check registration

Restart the Minecraft server with the playit agent running. Look for a Geyser log message similar to:

```text
Registered with the external signaling service. Players can join at https://your-tunnel.tun.ply.gg:19132
```

If registration fails, check the token and endpoint in `bedrock.signaling.nxs`. Confirm that the tunnel is enabled and assigned to the connected agent.

## 5. Connect from Bedrock

In Minecraft Bedrock, add a server using:

- **Server address:** your tunnel's hostname, such as `your-tunnel.tun.ply.gg`.
- **Port:** `19132`.

Use the hostname without `https://`. Use the join address printed by Geyser if it differs from this example.

Players join on port **19132**, even if the tunnel page displays a different public port.

Java Edition players need a separate Minecraft Java tunnel pointing to the Java server's port, usually `25565`.

## Troubleshooting

### You get a "Door" error when joining

Update the playit agent and restart Geyser. Check that Geyser prints the successful registration message shown above.

Check that the tunnel's local port matches Geyser's UDP port. Enter the tunnel hostname and port `19132` in Minecraft.

Keep Geyser's `bedrock.address` set to `0.0.0.0`. Allow the agent to reach Geyser over UDP if they run on separate machines or networks.

### "You are not whitelisted on this server"

The connection reached the Java server, but the player needs whitelist access. With Floodgate installed, run this command in the server console:

```text
fwhitelist add YourBedrockGamertag
```

Replace `YourBedrockGamertag` with the player's Xbox gamertag. Do not include Floodgate's username prefix. See [Floodgate's whitelist documentation](https://geysermc.org/wiki/floodgate/features/#whitelist-command).

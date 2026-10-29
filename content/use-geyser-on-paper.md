+++
title = "Setting up Geyser on Paper"
tags = ["minecraft", "guide", "geysermc", "papermc"]
description_file = "descriptions/use-geyser-on-paper.txt"
+++

Connect Bedrock players to your Paper Java server with Geyser and a **Minecraft Bedrock (NetherNet)** tunnel.

You need [Playit Premium](https://playit.gg/premium) and an up-to-date [playit agent](https://playit.gg/download) that supports NetherNet through NXS.

## 1. Install the server, Geyser, and Floodgate

Download [Paper](https://papermc.io/downloads/paper) and follow {{< link "how-to-setup-a-mc-server.md" >}} to prepare your Java server.

Download `Geyser-Spigot.jar` from [Geyser's downloads page](https://geysermc.org/download/?project=geyser). Place it in the server's `plugins` folder.

Install [Floodgate-Spigot](https://geysermc.org/wiki/floodgate/setup/) in the same folder to let Bedrock players join without a Java Edition account.

Keep `online-mode=true` in your Java server's `server.properties`.

Start the server once to generate the configuration files. Stop it before editing the Geyser configuration.

## 2. Create a NetherNet tunnel

Start the playit agent and confirm it is connected to your account. Create a tunnel in the [tunnel dashboard](https://playit.gg/account/tunnels):

- **Tunnel type:** Minecraft Bedrock (NetherNet).
- **Agent:** the agent that can reach this Minecraft server.
- **Local IP:** `127.0.0.1` when the agent and Geyser run on the same machine.
- **Local port:** `19132`.
- **Proxy Protocol:** None.

{{< image src="post-img/minecraft-nethernet-tunnel-type.png" alt="Minecraft Bedrock (NetherNet) selected in the new tunnel wizard" >}}

Select the entry with **(NetherNet)** in its name. The older Minecraft Bedrock tunnel uses a different transport.

If the agent runs on another machine or outside the server's container, use an address it can reach over UDP.

Open the tunnel page. Get its **NetherNet token**, hostname, public IPv4 address, and allocated UDP port.

{{< image src="post-img/minecraft-nethernet-origin.png" alt="NetherNet origin configuration with local IP 127.0.0.1, local port 19132, and no proxy protocol" >}}

Keep the local port at `19132`. Playit's allocated UDP port belongs in the advertised address below, rather than the local port field.

## 3. Configure Geyser on Paper

Open `plugins/Geyser-Spigot/config.yml`. Merge these settings into the existing `bedrock:` and `java:` sections:

```yaml
bedrock:
  address: 0.0.0.0
  port: 19132
  webrtc-port: 0
  transport: nethernet
  clone-remote-port: false
  signaling:
    mode: nxs
    advertise-addresses:
      - "203.0.113.10:44079"
    stun-discovery: false
    nxs:
      token: 'YOUR_NETHERNET_TOKEN'
      endpoint: https://nethernet.playit.gg

java:
  auth-type: floodgate
```

Replace `YOUR_NETHERNET_TOKEN` with the token from your tunnel page. Keep the token private.

Replace `203.0.113.10:44079` with your tunnel's **public IPv4 address and allocated UDP port**. The example address will not work as written.

`webrtc-port: 0` uses local UDP port `19132`. Keep `address: 0.0.0.0`, even when the agent forwards to `127.0.0.1`.

`signaling.mode: nxs` registers Geyser with `https://nethernet.playit.gg`. Put `advertise-addresses` directly under `signaling`, alongside `nxs`.

If you are not using Floodgate, keep `java.auth-type: online`. Bedrock players will need to authenticate with a Java Edition account.

## 4. Restart and connect

Restart the Minecraft server with the playit agent running. Geyser should print a message similar to:

```text
Registered with the external signaling service. Players can join at https://your-tunnel.tun.ply.gg:19132
```

In Minecraft Bedrock, add the tunnel's **hostname** as the server address and **19132** as the port.

Enter the hostname without `https://`. Use the join address printed by Geyser if it differs from the example.

Players use port `19132` for signaling. The allocated UDP port, such as `44079`, belongs in Geyser's `advertise-addresses`.

For Java players, create a separate Minecraft Java tunnel pointing to the Java server's port, usually `25565`.

## Troubleshooting

If registration fails, check the token, endpoint, and tunnel status. If joining times out, check both the local UDP port and advertised public endpoint.

If a Floodgate player is rejected by the whitelist, run `fwhitelist add YourBedrockGamertag` in the server console.

See {{< link "use-geyser-with-nethernet.md" >}} for detailed setting explanations and troubleshooting.

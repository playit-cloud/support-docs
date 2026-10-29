+++
title = "Setting up Geyser on Fabric"
tags = ["minecraft", "guide", "geysermc", "fabricmc"]
description_file = "descriptions/use-geyser-on-fabric.txt"
+++

Connect Bedrock players to your Fabric Java server with Geyser and a **Minecraft Bedrock (NetherNet)** tunnel.

You need [Playit Premium](https://playit.gg/premium) and an up-to-date [playit agent](https://playit.gg/download) that supports NetherNet through NXS.

## 1. Install the server, Geyser, and Floodgate

Install a [Fabric server](https://fabricmc.net/use/server/) for a Minecraft version supported by [Geyser-Fabric](https://geysermc.org/wiki/geyser/setup/).

Download `Geyser-Fabric.jar` from [Geyser's downloads page](https://geysermc.org/download/?project=geyser). Place it in the server's `mods` folder.

Install [Fabric API](https://modrinth.com/mod/fabric-api) in the same folder. Install the [Floodgate-Fabric mod](https://geysermc.org/wiki/floodgate/setup/) to let Bedrock players join without a Java Edition account.

Bedrock players cannot use Java client mods. Use server-side mods compatible with Geyser.

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

Select **Minecraft Bedrock (NetherNet)**, as highlighted above.

If the agent runs on another machine or outside the server's container, use an address it can reach over UDP.

Open the tunnel page. Copy its **NetherNet token** and **hostname**.

{{< image src="post-img/minecraft-nethernet-origin.png" alt="NetherNet origin configuration with local IP 127.0.0.1, local port 19132, and no proxy protocol" >}}

Keep the local port at `19132`. Playit handles the public connection address automatically.

## 3. Configure Geyser on Fabric

Open `config/Geyser-Fabric/config.yml`. Merge these settings into the existing `bedrock:` and `java:` sections:

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

`webrtc-port: 0` uses local UDP port `19132`. Keep `address: 0.0.0.0`, even when the agent forwards to `127.0.0.1`.

Keep `signaling.mode: nxs` and `endpoint: https://nethernet.playit.gg` as shown. If you previously set `bedrock.signaling.advertise-addresses`, remove that setting.

If you are not using Floodgate, keep `java.auth-type: online`. Bedrock players will need to authenticate with a Java Edition account.

## 4. Restart and connect

Restart the Minecraft server with the playit agent running. Geyser should print a message similar to:

```text
Registered with the external signaling service. Players can join at https://your-tunnel.tun.ply.gg:19132
```

In Minecraft Bedrock, add the tunnel's **hostname** as the server address and **19132** as the port.

Enter the hostname without `https://`. Use the join address printed by Geyser if it differs from the example.

Players join on port `19132`, even if the tunnel page displays a different public port.

For Java players, create a separate Minecraft Java tunnel pointing to the Java server's port, usually `25565`.

## Troubleshooting

If registration fails, check the token, endpoint, and tunnel status. If joining times out, check the local UDP port and the address entered in Minecraft.

If a Floodgate player is rejected by the whitelist, run `fwhitelist add YourBedrockGamertag` in the server console.

See {{< link "use-geyser-with-nethernet.md" >}} for detailed setting explanations and troubleshooting.

+++
title = "Setting up Minecraft Bedrock with NetherNet"
tags = ["minecraft", "guide", "networking"]
description_file = "descriptions/minecraft-bedrock-nethernet.txt"
+++

Use the **Minecraft Bedrock (NetherNet)** tunnel type for current Minecraft Bedrock clients. Playit handles external signaling (NXS) and forwards the UDP game traffic to your server or proxy.

NetherNet tunnels require [Playit Premium](https://playit.gg/premium) and an up-to-date [playit agent](https://playit.gg/download) with NXS support.

NetherNet support is experimental. Check the notice on your tunnel page for current platform limitations.

## Choose your server setup

### Bedrock players joining a Java server

Install Geyser and, optionally, Floodgate. Follow the guide for your platform:

- {{< link "use-geyser-on-paper.md" >}}
- {{< link "use-geyser-on-fabric.md" >}}
- {{< link "use-geyser-with-nethernet.md" >}} for other Geyser platforms.

### A vanilla Bedrock Dedicated Server

Run WaterdogPE in front of the Microsoft server. Follow {{< link "use-bedrock-with-waterdog.md" >}}.

The vanilla server does not provide NXS endpoint or token settings. WaterdogPE handles that registration and connects to the vanilla server locally.

## Create the correct tunnel

Select **Minecraft Bedrock (NetherNet)** when creating your tunnel:

{{< image src="post-img/minecraft-nethernet-tunnel-type.png" alt="Select Minecraft Bedrock (NetherNet) in the tunnel wizard" >}}

Set the tunnel's local IP to `127.0.0.1` when the agent runs alongside Geyser or WaterdogPE. Set its local port to `19132`.

Get the NetherNet token from the tunnel page. Configure your NXS host with that token and `https://nethernet.playit.gg`.

Follow the selected guide for the complete configuration. The examples use different ports for different purposes:

- **Local UDP port:** `19132`, where Geyser or WaterdogPE receives traffic from the agent.
- **Allocated public UDP port:** the port assigned by playit, used with the public IPv4 address in the NXS host's advertised addresses.
- **Player join port:** `19132`, used with the tunnel hostname for signaling.

## Moving from the older Bedrock setup

Create a Minecraft Bedrock (NetherNet) tunnel for your existing server. Configure Geyser or WaterdogPE with its token and public UDP endpoint.

Replace older RakNet-only configuration with the NetherNet settings in the appropriate guide. Changing only `transport` does not configure NXS signaling.

Restart the NXS host and confirm that it prints a successful registration message. Share the new tunnel hostname and join port `19132` with players.

Keep an existing Minecraft Java tunnel if Java players still need it.

This page replaces the earlier recommendation to switch Bedrock servers back to RakNet. Use the NetherNet setup above for current clients.

## If joining fails with "Door"

Check that the NXS host registered successfully. Confirm that the tunnel points to its local UDP port and advertises the correct public IPv4 address and allocated UDP port.

Keep Geyser or WaterdogPE listening on `0.0.0.0`. Use a playit agent that supports forwarding NetherNet traffic through NXS.

See the troubleshooting section in your server's setup guide for authentication, whitelist, and backend connection errors.

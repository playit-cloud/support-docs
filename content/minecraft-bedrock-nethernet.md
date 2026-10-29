+++
title = "Setting up Minecraft Bedrock with NetherNet"
tags = ["minecraft", "guide", "networking"]
description_file = "descriptions/minecraft-bedrock-nethernet.txt"
+++

Let friends join your Minecraft Bedrock server with a **Minecraft Bedrock (NetherNet)** tunnel. Choose the guide below for your server software.

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

Install WaterdogPE on the same computer as your Bedrock server. Configure your tunnel to send traffic to WaterdogPE.

## Create the correct tunnel

Select **Minecraft Bedrock (NetherNet)** when creating your tunnel:

{{< image src="post-img/minecraft-nethernet-tunnel-type.png" alt="Select Minecraft Bedrock (NetherNet) in the tunnel wizard" >}}

Set the tunnel's local IP to `127.0.0.1` when the agent runs alongside Geyser or WaterdogPE. Set its local port to `19132`.

Copy the NetherNet token from your tunnel page. Follow your server's guide to add that token and `https://nethernet.playit.gg` to Geyser or WaterdogPE.

Follow the selected guide for the complete configuration. The examples use different ports for different purposes:

- **Local UDP port:** `19132`, where Geyser or WaterdogPE receives traffic from the agent.
- **Allocated public UDP port:** copy this from your tunnel page, together with the public IPv4 address, into Geyser or WaterdogPE's advertised addresses.
- **Player join port:** `19132`, used with the tunnel hostname for signaling.

## If you already have a Bedrock tunnel

Create a Minecraft Bedrock (NetherNet) tunnel for your existing server. Configure Geyser or WaterdogPE with its token and public UDP endpoint.

Apply the complete configuration from your server's guide, including the token, endpoint, and advertised address.

Restart Geyser or WaterdogPE and check for a successful registration message. Share your new tunnel hostname and port `19132` with players.

Keep an existing Minecraft Java tunnel if Java players still need it.

## If joining fails with "Door"

Check the Geyser or WaterdogPE console for a successful registration message. Check the tunnel's local port and your configured public IPv4 address and allocated UDP port.

Keep Geyser or WaterdogPE listening on `0.0.0.0`. Update your playit agent to the latest version.

See the troubleshooting section in your server's setup guide for account, whitelist, and server connection errors.

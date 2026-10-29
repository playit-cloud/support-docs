+++
title = "Setting up Geyser with playit"
tags = ["minecraft", "guide", "geysermc"]
description_file = "descriptions/use-geyser-with-playit.txt"
+++

Geyser lets Minecraft Bedrock players join a Java Edition server. Use a **Minecraft Bedrock (NetherNet)** tunnel with playit's external signaling service (NXS).

Choose the guide for your Java server:

- {{< link "use-geyser-on-paper.md" >}}
- {{< link "use-geyser-on-fabric.md" >}}

For other Geyser platforms, follow {{< link "use-geyser-with-nethernet.md" >}} and use your platform's Geyser configuration path.

Each guide includes the NetherNet tunnel, token, NXS endpoint, and Geyser configuration. Playit Premium and an agent with NetherNet NXS support are required.

Bedrock players join with the tunnel hostname on port **19132**. Playit's allocated UDP port belongs in the advertised address in Geyser's configuration.

For a vanilla Bedrock server, use {{< link "use-bedrock-with-waterdog.md" >}} instead. That setup uses WaterdogPE rather than Geyser.

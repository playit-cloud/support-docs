+++
title = "Setting up Left 4 Dead 2 with playit"
tags = ["Left 4 Dead 2", "L4D2", "guide"]
description_file = "descriptions/l4d2.txt"
+++

This guide will walk you through how to host a Left 4 Dead 2 server through playit.gg

## Requirements
* **Left 4 Dead 2** - [[steam.com]](https://store.steampowered.com/app/550/Left_4_Dead_2/)
* **Left 4 Dead 2 Dedicated Server** - [[steam.com]](https://store.steampowered.com/app/222860/Left_4_Dead_2_Dedicated_Server/)

### Server

Open `Left 4 Dead 2 Dedicated Server` from Steam, and set the `Network` to `LAN`. Feel free to change the server name, map and max players.

{{< image src="post-img/playit-l4d2-serverconfig.png" alt="L4D2 Server Config" >}}

That's all for the server config, let's set up a tunnel next.

### Creating a tunnel
> This server uses `UDP 27015`, which means that all users can create this tunnel type.

Set up the tunnel as follows:

```text
Tunnel Type: UDP (protocol)
Port Count: 1
Local Port: 27015
```

{{< image src="post-img/playit-l4d2-tunnelconfig.png" alt="L4D2 Tunnel Config" >}}

{{< image src="post-img/playit-l4d2-tunnelconfig.png" alt="L4D2 Tunnel Info" >}}

### Joining the server
Inside of the game, go to `Options` > `Keyboard/Mouse` and enable `Allow Developer Console`.

{{< image src="post-img/playit-l4d2-enableconsole.png" alt="L4D2 Enable Console" >}}

Press the Tilde key, `~` and type in `connect 147.185.221.25:9404`. Your tunnel and port will be different, so match it with the information that playit has provided.

{{< image src="post-img/playit-l4d2-consoleconnect.png" alt="L4D2 Console Direct Connect" >}}

After pressing `enter` or clicking `Submit`, you and your friends should be able to connect to the game server using playit's tunnel.
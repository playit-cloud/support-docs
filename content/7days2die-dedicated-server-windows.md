+++
title = "Setting up 7 Days to Die with playit"
tags = ["7 Days to Die", "7D2D", "guide"]
description_file = "descriptions/7d2d.txt"
+++

This guide will walk you through how to host a 7 Days to Die server through playit.gg

## Requirements
* **7 Days to Die** - [[steampowered.com]](https://store.steampowered.com/app/251570/7_Days_to_Die/)
* **7 Days to Die Dedicated Server** - [[steampowered.com]](https://store.steampowered.com/app/294420/)

## Documentation
* **7 Days to Die Dedicated Server - Valve Developer Community** - [[developer.valvesoftware.com]](https://developer.valvesoftware.com/wiki/7_Days_to_Die_Dedicated_Server)
* **Server - 7 Days to Die Wiki** - [[7daystodie.fandom.com]](https://7daystodie.fandom.com/wiki/Server)

### Server

Find `7 Days to Die Dedicated Server` in Steam, and then right click `Manage` and then `Browse local files`.

{{< image src="post-img/playit-7d2d-browselocalfiles.png" alt="7D2D Browse Local Files" >}}

Inside of this folder, you will find `startdedicated.bat`. Double click this to start the server with the default configuration.

{{< image src="post-img/playit-7d2d-serverfiles.png" alt="7D2D Server Files" >}}

### Creating a tunnel
> This server uses `UDP 26900-26903`, which means that all users can create this tunnel type.

Set up the tunnel as follows:

```text
Tunnel Type: UDP (protocol)
Port Count: 4
Local Port: 26900
```

{{< image src="post-img/playit-7d2d-tunnelconfig.png" alt="7D2D Tunnel Config" >}}

{{< image src="post-img/playit-7d2d-tunnelinfo.png" alt="7D2D Tunnel Info" >}}

### Joining the server
Inside of the game, go to `Join A Game` > `Connect To IP...` and then enter the tunnel information provided by playit. You can use either the hostname or the IP address and port to connect.

{{< image src="post-img/playit-7d2d-serversearch.png" alt="7D2D Join Server" >}}

{{< image src="post-img/playit-7d2d-directconnect.png" alt="7D2D Join Server" >}}

If your server and tunnel have been successfully configured, you should see this screen.


{{< image src="post-img/playit-7d2d-ready.png" alt="7D2D Join Server Ready" >}}
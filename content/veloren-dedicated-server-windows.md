+++
title = "Setting up Veloren with playit"
tags = ["Veloren", "guide"]
description_file = "descriptions/veloren.txt"
+++

This guide will walk you through how to host a Veloren Dedicated Server with playit.gg

## Requirements
* **Veloren** - [[veloren.net]](https://veloren.net/download/)

## Resources
* **Hosting a Server** - [[book.veloren.net]](https://book.veloren.net/players/server-hosting/on-your-pc.html)
* **Server Wiki** - [[wiki.veloren.net]](https://wiki.veloren.net/wiki/Hosting_a_Server)

### Server
The server is already downloaded and installed, assuming it was installed using Airshipper.
You can start the server by opening `run` and going to `%appdata%/airshipper/profiles/default`. The server executable is located at `veloren-server-cli.exe` and you can simply double click this to run the server

{{< image src="post-img/playit-veloren-serverfiles.png" alt="Veloren Server Files" >}}

### Creating a tunnel
> This server uses `TCP 14004`, which means that [Playit Premium](https://playit.gg/account/upgrade) is required.

Set up the tunnel as follows:

```text
Tunnel Type: TCP (protocol)
Port Count: 1
Software Description: Veloren
Local Port: 14004
```

{{< image src="post-img/playit-veloren-tunnelconfig.png" alt="Veloren Tunnel Configuration" >}}

### Joining the server
In the main menu, you have the option to log into your Veloren account and join a server.
At the server URL, type the tunnel IP address or domain into this field, and then click `Multiplayer`.
You should start to join the server shortly after.

{{< image src="post-img/playit-veloren-tunnelinfo.png" alt="Veloren Tunnel Information" >}}

{{< image src="post-img/playit-veloren-joinserver.png" alt="Join Veloren Server" >}}

{{< image src="post-img/playit-veloren-joinedserver.png" alt="Joined Veloren Server" >}}
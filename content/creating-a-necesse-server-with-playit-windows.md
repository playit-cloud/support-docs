+++
title = "Setting up Necesse with playit"
tags = ["Necesse", "guide"]
description_file = "descriptions/playit-necesse.txt"
+++

This guide will walk you through how to host a Necesse server through playit.gg

## Requirements
* **Necesse** - [Steam](https://store.steampowered.com/app/1169040/Necesse/)

### Server
> **`Steam\steamapps\common\Necesse\StartServer.jar`**

### Server Documentation
> **Multiplayer - Necesse Wiki** - [necessewiki.com](https://necessewiki.com/)


{{< image src="post-img/playit-necesse-serverfiles_server.png" alt="Necesse server files" >}}

### Server Files
> **`%AppData%\Necesse\saves\`**

{{< image src="post-img/playit-necesse-serverfiles_saves.png" alt="Necesse server saves" >}}

## Server Setup

Find and locate `StartServer.bat`, then double click the batch file. This will open a window where server options can be configured.
> **You do not need to set up custom server properties. There are linked resources to help you if needed. For this guide, we just selected `n` to keep server defaults.** 

{{< image src="post-img/playit-necesse-server_newname.png" alt="Necesse server config, 1" >}}

{{< image src="post-img/playit-necesse-server_custom_options.png" alt="Necesse server config, 2" >}}

{{< image src="post-img/playit-necesse-server_started.png" alt="Necesse server console, 1" >}}

{{< image src="post-img/playit-necesse-server_started_console.png" alt="Necesse server console, 2" >}}


## Tunnel Setup
Create a new agent and add a tunnel

Set up the tunnel as follows:

```text
Tunnel Type: UDP (protocol)
Port Count: 1
Local Port: 14159
```

{{< image src="post-img/playit-necesse-tunnelconfig_new.png" alt="Necesse tunnel config, 1" >}}

{{< image src="post-img/playit-necesse-tunnelinfo_new.png" alt="Necesse tunnel config, 2" >}}

### Connecting to the server

Inside of Necesse, click on **`Play Multiplayer`** and then **`Join a server`**. Click on **`Add server`** and enter a name, along with the tunnel's IP address and port.

{{< image src="post-img/playit-necesse-tunnelconnect_new.png" alt="Necesse server join, 1" >}}

Click on **`Add`** and your server should be in the server list, using playit's IP address and port.

{{< image src="post-img/playit-necesse-serverlist_new.png" alt="Necesse server join, 2" >}}

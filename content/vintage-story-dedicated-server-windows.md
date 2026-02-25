+++
title = "Vintage Story Dedicated Server Guide"
tags = ["vintage story", "guide"]
description_file = "descriptions/vintage-story-server.txt"
+++

This guide walks you through setting up a Vintage Story server using the files bundled with the game, and then sharing it to the internet using playit.

> Ways you can host: [Hosting your own game server](https://www.vintagestory.at/selfhosting/)
>
> Official Server Guide: [Setting up a Multiplayer Server](https://wiki.vintagestory.at/Setting_up_a_Multiplayer_Server)
>
> Server Configuration: [Server Config](https://wiki.vintagestory.at/Server_Config)

### Requirements

* Vintage Story
* .NET 8.0.13 Desktop Runtime (comes with installer)


### Locate the server files

The dedicated server is included with the Vintage Story installation. Navigate to the following path for your operating system, or use the `run` dialogue window and paste these values


**Server Executable**
```text
%AppData%\Vintagestory\VintagestoryServer.exe
```

**Server Config File**
```text
%AppData%\VintagestoryData\serverconfig.json
```

---

## Server Setup

Open the server executable mentioned before, and wait for it to fully start
> By default, the server has a whitelist enabled. To whitelist a player, run this in the server console:
>
>```text
>/whitelist add <username>
>```
> If you would like to **disable** the whitelist, you can run this command:
>```text
>/whitelist off
>```

### Tunnel Setup

Go to the [playit.gg dashboard](https://playit.gg/account/agents) and select an agent to create the tunnel. If you have not created an agent, see the [downloads page](https://playit.gg/download) and follow the setup instructions.

**Create a new tunnel** with the following settings:

```text
Tunnel Type: Vintage Story (game)
```

{{< image src="post-img/playit-vintagestory-addtunnel.png" alt="Add VS tunnel" >}}

After your tunnel is created, you can connect using the domain and port given by playit:

{{< image src="post-img/playit-vintagestory-tunnelinfo.png" alt="Tunnel information" >}}

### Joining the server

To do this, all we need to do is give the server a name, and enter the connection information from before.

{{< image src="post-img/playit-vintagestory-addserver-with-domain.png" alt="Add VS server with domain" >}}

Click **Save**, and click on the server we just created. You should see verbose progress updates as you're loading in.

{{< image src="post-img/playit-vintagestory-connecting.png" alt="Connecting to game server" >}}

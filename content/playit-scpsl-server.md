+++
title = "Set up SCP: Secret Laboratory with playit"
tags = ["guide", "game", "SCPSL"]
description_file = "descriptions/playit-scpsl-server.txt"
+++

This guide walks you through how to set up a server for SCP: Secret Laboratory using playit.gg

Requirements:
> SCP: Secret Laboratory [(Game)](https://store.steampowered.com/app/700330/SCP_Secret_Laboratory/)
>
> SCP: Secret Laboratory [(Server)](https://store.steampowered.com/app/996560/SCP_Secret_Laboratory_Dedicated_Server/)

Resources:
> SCP: Secret Laboratory Server Info - [en.scpslgame.com](https://en.scpslgame.com/index.php/Server_Info)

## Getting started
### Locate the server files

Right click on **SCP: Secret Laboratory Dedicated Server**, and navigate to **Manage → Browse local files**.
{{< image src="post-img/playit-scpsl-browsefiles.png" alt="Browse local files" >}}

Inside, you'll see the following file structure:
{{< image src="post-img/playit-scpsl-serverfiles.png" alt="Server files" >}}

> Server config files can be found here:
> ```text
> %AppData%\SCP Secret Laboratory\config\
> ```

### Opening the server
To launch the server, double click on `LocalAdmin.exe`.
This will ask for a little bit of setup, but it's pretty easy.

The default port is `TCP/UDP 7777`, it can stay like that. You can just press enter and go to the next step
{{< image src="post-img/playit-scpsl-serverconsole_port.png" alt="Server console setup" >}}

It will then ask if you want to edit the configuration. The default configuration is fine, and you can edit them if you want. For the simplicity of this guide, we will just choose `keep`.
{{< image src="post-img/playit-scpsl-serverconsole_config.png" alt="Server console setup" >}}

For `Do you want to save the configuration only for THIS server` we will choose `this`. This keeps different server configs sepaarated, if you plan on running different servers.
{{< image src="post-img/playit-scpsl-serverconsole_config-this_local.png" alt="Server console setup" >}}

Your server should now be running. The console output should look like this:
{{< image src="post-img/playit-scpsl-serverconsole_running.png" alt="Server console" >}}

### Tunnel setup
> Since the game uses both `TCP` and `UDP`, we will create a `TCP/UDP` tunnel. However, since TCP is not available to free users anymore, [playit premium](https://playit.gg/account/billing/shop/premium) is required.

Add an [agent](https://playit.gg/account/agents) if you haven't done that yet.
Configure the tunnel as follows:

```text
Tunnel Type: TCP/UDP (protocol)
Port Count: 1
Local Port: 7777
```

{{< image src="post-img/playit-scpsl-tunnelconfig.png" alt="Tunnel setup" >}}

### Connecting to the server
Get the hostname/IP address from the tunnel - this can be found in the tunnel page.

{{< image src="post-img/playit-scpsl-tunnelinfo.png" alt="Tunnel address" >}}

Inside of SCP: Secret Laboratory, go to **Servers** and then click on **Direct Connect**.
Enter your tunnel information from earlier into here, and then click **Connect**.

{{< image src="post-img/playit-scpsl-serverlist_directconnect.png" alt="Connecting to the server" >}}

{{< image src="post-img/playit-scpsl-serverlist_directconnect-filled.png" alt="Connecting to the server" >}}

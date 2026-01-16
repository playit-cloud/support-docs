+++
title = "Set up a BeamMP server with playit"
tags = ["guide", "game", "BeamNG", "BeamMP"]
description_file = "descriptions/playit-beamng-beammp-server.txt"
+++

This guide will walk you through how to set up a BeamNG BeamMP server using playit.

Requirements:
> [BeamNG.drive - Game](https://store.steampowered.com/app/284160/BeamNGdrive/)
>
> BeamMP Client/Server - [beammp.com](https://beammp.com/)

Resources:
> [BeamMP Server Installation](https://docs.beammp.com/server/create-a-server/)
>
> [BeamMP Client Intallation](https://docs.beammp.com/game/getting-started/)
>
> [BeamMP Keymaster](https://keymaster.beammp.com/dashboard)

## Getting a server key

Sign into [BeamMP Keymaster](https://keymaster.beammp.com/dashboard) and create a new [key](https://keymaster.beammp.com/keys)
{{< image src="post-img/playit-beammp-create_key.png" alt="Create Key" >}}
{{< image src="post-img/playit-beammp-key.png" alt="Create Key" >}}

Your key is what allows the server to become online to other players.

## Initializing the server
Move `BeamMP-Server.exe` into a folder where it won't get lost or overwritten.
{{< image src="post-img/playit-beammp-serverfiles.png" alt="Server Files" >}}

Open `BeamMP-Server.exe`, and wait. The server will fail to open at first, because we haven't told it our key.

```text
[16/01/26 14:34:28] [ERROR] No AuthKey specified in the "ServerConfig.toml" file. Please get an AuthKey, enter it into the config file, and restart this server.
[16/01/26 14:34:28] [INFO] Closing in 10 seconds
```

A new `ServerConfig.toml` has been created. Open this file.
{{< image src="post-img/playit-beammp-config_authkey.png" alt="Server Config" >}}

On Line 7, you will see an entry called `AuthKey = ""`. This is where we will paste our server key. In this case, our key is `b30b9beb-df6b-428b-823f-429ed25d4ea7`.
The entry should look like `AuthKey = "b30b9beb-df6b-428b-823f-429ed25d4ea7"`. Save the file.
{{< image src="post-img/playit-beammp-config_authkey-set.png" alt="Server Config" >}}

Open `BeamMP-Server.exe` again. Your console's output should look like this:
{{< image src="post-img/playit-beammp-console_success.png" alt="Server Console Success" >}}

## Tunnel setup
> Since the game uses both `TCP` and `UDP`, we will create a `TCP/UDP` tunnel. However, since TCP is not available to free users anymore, [playit premium](https://playit.gg/account/billing/shop/premium) is required.

Add an [agent](https://playit.gg/account/agents) if you haven't done that yet.
Configure the tunnel as follows:

```text
Tunnel Type: TCP/UDP (protocol)
Port Count: 1
Local Port: 30814
```

{{< image src="post-img/playit-beammp-tunnelconfig.png" alt="Tunnel Config" >}}

You now have a tunnel. At the top of the page, you will find a hostname (domain) and an IP address and port.
{{< image src="post-img/playit-beammp-tunnelinfo.png" alt="Tunnel Config Info" >}}

## Setting up BeamNG.drive
Visit [beammp.com](https://beammp.com/) and download `BeamMP_Installer.zip` and extract `BeamMP_Installer.exe`.

Open `BeamMP_Installer.exe` and continue with installation.

Open BeamMP Launcher, and then wait for the game to open.
{{< image src="post-img/playit-beammp-beammp_launcher_via_search.png" alt="Open BeamMP Launcher" >}}

Once the game has launched, click on **Repository** and make sure that `multiplayerbeammp` is the **only** mod enabled.
{{< image src="post-img/playit-beammp-beammp_mainmenu_hover_over_repo.png" alt="BeamNG Mod Repository" >}}
{{< image src="post-img/playit-beammp-beammp_mainmenu_repo_mods.png" alt="BeamNG Mod Repository" >}}

Once you've verified that it is the only mod enabled, return back to the main menu and click on **More...** and then **Multplayer (Mod)**
{{< image src="post-img/playit-beammp-beammp_mainmenu_more_multiplayer.png" alt="BeamNG Extended Menu" >}}

Accept and agree to the [BeamMP Terms of Service](https://forum.beammp.com/t/terms-of-use-v1-0/43) and their [rules](https://docs.beammp.com/community/rules/) respectively, and then click continue.
[Register a new account with BeamMP](https://forum.beammp.com/signup) and then sign into the mod using the new account.

Go to **Direct Connect** and enter the tunnel information from earlier, and add it to favourites if you would like. You may use either the hostname or IP address.
{{< image src="post-img/playit-beammp-beammp_mainmenu_more_multiplayer_directconnect.png" alt="BeamMP Direct Connect" >}}
{{< image src="post-img/playit-beammp-beammp_mainmenu_more_multiplayer_directconnect_filled.png" alt="BeamMP Direct Connect" >}}

You should now be able to connect and play BeamNG.drive with other players using playit.
{{< image src="post-img/playit-beammp-beammp_connecting.png" alt="BeamMP Loading" >}}
{{< image src="post-img/playit-beammp-beammp_connected.png" alt="BeamMP Connected" >}}
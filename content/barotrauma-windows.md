+++
title = "Setting up a Barotrauma server on Windows"
tags = ["Barotrauma", "Guide"]
description_file = "descriptions/barotrauma-windows.txt"
+++

## Setting Everything Up
Download [Barotrauma](https://store.steampowered.com/app/602960) from Steam if you haven't already. The game comes bundled with the server executable.

### Find the server files
You can do this by right clicking on **Barotrauma**, and then **Manage -> Browse local files** 

{{< image src="post-img/barotrauma-browse-local-files.png" alt="Barotrauma Server Files" >}}

### Server configuration
Inside, you will see `serversettings.xml`. It looks like this:

{{< image src="post-img/barotrauma-server-config.png" alt="Barotrauma Server Configuration" >}}

Modify this to your liking. Documentation on this file can be found here:

**Serversettings.xml - Official Barotrauma Wiki** - [[barotraumagame.com]](https://barotraumagame.com/wiki/Serversettings.xml)

### Create the tunnel
* **Type:** UDP
* **Port Count:** 1
* **Local IP:** 127.0.0.1
* **Port:** 27015

{{< image src="post-img/barotrauma-tunnel-windows.png" alt="Barotrauma Tunnel Configuration" >}}

> The query port requires 2 ports, but this isn't required. The local port is `27016`.

## Starting the server
Inside, you will find `DedicatedServer.exe`. If you can't find this file in the mess of DLL files, search for `*.exe`.

{{< image src="post-img/barotrauma-server-files.png" alt="Barotrauma Server Files" >}}

{{< image src="post-img/barotrauma-windows-server-console.png" alt="Barotrauma Server Console" >}}

### Joining the server
Go to **Server Browser -> Direct Join** and then paste in the IP address provided by playit.

{{< image src="post-img/barotrauma-game-menu-server-browser-hover.png" alt="Barotrauma Server Browser Hover" >}}

{{< image src="post-img/barotrauma-game-menu-direct-join-hover.png" alt="Barotrauma Direct Join Hover" >}}

{{< image src="post-img/barotrauma-game-menu-direct-join-dialogue.png" alt="Barotrauma Server Direct Join Dialogue" >}}

If you set a password in `serversettings.xml`, it will ask for the password.

{{< image src="post-img/barotrauma-game-menu-server-password-dialogue.png" alt="Barotrauma Server Password Dialogue" >}}

### Server settings
By default, all users are treated as a normal user. In order to change these settings, you must grant yourself admin permissions. Use `giveperm <username> all`

{{< image src="post-img/barotrauma-game-menu-lobby-no-permissions.png" alt="Barotrauma Game Lobby No Permissions" >}}

{{< image src="post-img/barotrauma-windows-server-console-grant-all.png" alt="Barotrauma Game Console Grant Permissions" >}}

Once you grant yourself every permission, you are then able to change the mode, game settings, and other things.

{{< image src="post-img/barotrauma-game-menu-lobby-granted-permissions.png" alt="Barotrauma Game Lobby All Permissions" >}}

{{< image src="post-img/barotrauma-game-menu-lobby-settings.png" alt="Barotrauma Game Lobby Settings" >}}

### Starting the game
Once everyone in the lobby, you can then start the game.

{{< image src="post-img/barotrauma-gameplay.png" alt="Barotrauma Game Lobby Settings" >}}
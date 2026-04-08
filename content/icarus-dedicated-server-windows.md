+++
title = "Setting up Icarus with playit"
tags = ["Icarus", "guide"]
description_file = "descriptions/icarus-windows.txt"
+++

This guide will walk you through how to host an Icarus Dedicated Server with playit.gg

## Requirements
* **Icarus** - [[steampowered.com]](https://store.steampowered.com/app/1149460/)
* **Icarus Dedicated Server** - [[steampowered.com]](https://store.steampowered.com/app/2089300)

## Resources
* **Server Setup - RocketWerkz** - [[github.com]](https://github.com/RocketWerkz/IcarusDedicatedServer/wiki/Server-Setup)

### Server
This server is available for download with [SteamCMD](https://developer.valvesoftware.com/wiki/SteamCMD).
To install with SteamCMD, open it in a command line. You can do this by navigating to your install location, and opening a command with your address bar (did you know you could do that?)

{{< image src="post-img/playit-steamcmd-opensteamcmd.png" alt="Open SteamCMD Console" >}}

Now that we're in the SteamCMD directory, we need to tell it where it should download the server files. To do this, we can use the `force_install_dir` command. For example, if you want this directly on your main drive, you can use `force_install_dir C:\IcarusServer\`

You can now log into SteamCMD using `login anonymous`, and to download the server use `app_update 2089300 validate` where `2089300` is the Steam App ID.

### Configuring the server
Create a new file at `<installdir>\Icarus\Saved\Config\WindowsServer\ServerSettings.ini`. Inside of the new file, paste the following content:

```ini
[/Script/Icarus.DedicatedServerSettings]
SessionName=
JoinPassword=
MaxPlayers=
AdminPassword=
ShutdownIfNotJoinedFor=300.000000
ShutdownIfEmptyFor=300.000000
AllowNonAdminsToLaunchProspects=True
AllowNonAdminsToDeleteProspects=False
LoadProspect=
CreateProspect=
ResumeProspect=True
LastProspectName=
```
Name the session a join and/or admin password if you desire.

### Starting the server
A batch file can be created. It can be called anything, but `StartServer.bat` works just fine - put this in the install directory of the server's files.
```bat
IcarusServer.exe -log
```

This will open a command line interface to start the server with logging enabled. Otherwise, the server will open in the background with no verbose logging.

### Creating a tunnel
> This server uses `UDP 27015`, which means that all users can create this tunnel type.

Set up the tunnel as follows:

```text
Tunnel Type: UDP (protocol)
Port Count: 1
Software Description: Steam Discovery
Local Port: 27015
```

{{< image src="post-img/playit-icarus-tunnelconfig.png" alt="Icarus Tunnel Configuration" >}}

{{< image src="post-img/playit-icarus-tunnelinfo.png" alt="Icarus Tunnel Information" >}}

### Joining the server

You will need to add the server to your favorites.
This can be done by going into `Steam > View > Game Servers` and then click the `+` button.
Copy and paste the IP address or hostname, and then `OK`

{{< image src="post-img/playit-icarus-view_menu.png" alt="Steam \"View\" Menu" >}}

{{< image src="post-img/playit-icarus-view_servers.png" alt="Steam \"Game Server\" Menu" >}}

{{< image src="post-img/playit-icarus-view_servers-added.png" alt="Steam \"Game Server\" Menu" >}}

Once this has been added to the list of favorited servers, you can join from the game's own "Favorites" list.

{{< image src="post-img/playit-icarus-joinserver.png" alt="Icarus \"Favorites\" Menu" >}}

{{< image src="post-img/playit-icarus-joiningserver.png" alt="Icarus Joining Server" >}}

{{< image src="post-img/playit-icarus-joinedserver.png" alt="Icarus Joined Server" >}}
+++
title = "Setting up an Unturned server on Windows"
tags = ["Unturned", "guide", "windows"]
description_file = "descriptions/unturned-dedicated-server-windows.txt"
+++

This guide walks you through running an Unturned Dedicated Server on Windows and sharing it with playit.gg.

We'll use `+LanServer` and connect directly through a playit tunnel. The server won't appear in Unturned's Internet server list.

## Requirements

* [Unturned](https://store.steampowered.com/app/304930/Unturned/) to join and test the server.
* [Unturned Dedicated Server](https://store.steampowered.com/app/1110390/Unturned_Dedicated_Server/), installed separately through Steam.
* A Steam account eligible to create a **Game Server Login Token (GSLT)**. We'll add the token before joining through playit.

## Find the server files

In your Steam Library, enable **Tools** in the library filter and search for **Unturned Dedicated Server**. Install it if you haven't already.

{{< image src="post-img/unturned-windows-steam-library.jpg" alt="Steam Library search showing Unturned Dedicated Server under Tools" >}}

Right click **Unturned Dedicated Server**, then choose **Manage → Browse local files**. This opens the `U3DS` folder. Your Steam library location may be different from the one shown here.

{{< image src="post-img/unturned-windows-steam-browse-files.jpg" alt="Right-click menu for Unturned Dedicated Server in Steam, with Manage expanded to show Browse local files" >}}

{{< image src="post-img/unturned-windows-server-files.jpg" alt="Unturned Dedicated Server installation folder in File Explorer" >}}

## Create a startup file

Create `StartUnturnedServer.bat` inside `U3DS` with the following contents:

```bat
@echo off
start "" "%~dp0ServerHelper.bat" +LanServer/UnturnedServer
```

`%~dp0` tells Windows to use the drive and folder containing this `.bat` file. For example, if you save it in `D:\Steam\steamapps\common\U3DS`, then `%~dp0ServerHelper.bat` points to `D:\Steam\steamapps\common\U3DS\ServerHelper.bat`.

Keep `%~dp0` exactly as shown; you don't need to replace it with your Steam library path. Save `StartUnturnedServer.bat` in the same folder as `ServerHelper.bat`, and keep the quotation marks so paths containing spaces work.

If you need help creating a `.bat` file, see {{< link "creating-a-bat-file" >}}. Make sure the file isn't saved as `StartUnturnedServer.bat.txt`.

`UnturnedServer` is the server ID. It controls which folder holds this server's settings and world. Keep the same ID each time you start it.

Double click your startup file and let the server finish loading. The first run generates its configuration files. Wait for **Loading level: 100%**, then enter `Shutdown` in the server console to save and stop it before editing.

## Configure the server

Open this file in a text editor:

```text
U3DS\Servers\UnturnedServer\Server\Commands.dat
```

Add these lines, replacing existing entries for the same settings:

```text
Name Unturned via playit.gg
Map PEI
Port 27015
MaxPlayers 8
Perspective Both
```

You can change the name and player limit. `PEI` is included with the server, so no Workshop downloads are needed for this setup.

For a private game, add a password on its own line:

```text
Password YourUniqueServerPassword
```

Players will need that password when joining. Use a password you don't use for another account.

Most other settings are in `U3DS\Servers\UnturnedServer\Config.txt`. Leave **Use_FakeIP** at its default, `False`, for this tunnel setup. Older server folders may have `Config.json`; see the [official configuration documentation](https://docs.smartlydressedgames.com/en/stable/servers/server-configuration.html).

## Set up a Game Server Login Token (GSLT)

A GSLT logs your dedicated server into Steam. It is separate from the password players enter to join your world, and from the Server Code displayed in the console.

Keep `+LanServer` in your startup file. In our test with Unturned **3.26.3.13**, local joining worked without a token, but joining through the playit public IP was blocked. Adding a valid GSLT enabled public-IP joining while keeping the LAN startup argument.

### Create your token

Open [Steam Game Server Account Management](https://steamcommunity.com/dev/managegameservers) and sign in. Steam lists the account requirements on that page, including owning the game, having a qualifying registered phone, and having an unrestricted, non-limited account.

Create a game server account using:

```text
App ID: 304930
Memo: Unturned playit server
```

Use **304930**, the Unturned game's app ID. You can change the memo to anything you want; it's just a label to help you recognize the server. If you already have a valid Unturned token for this server, you can use it.

{{< image src="post-img/unturned-windows-gslt-create.jpg" alt="Steam's Create a new game server account form filled with app ID 304930 and memo Unturned playit server" >}}

Click **Create**, then copy the generated login token for the next step.

### Add the token to Commands.dat

With the server stopped, open `U3DS\Servers\UnturnedServer\Server\Commands.dat`. Add a single `GSLT` line with your token after the space. The file should look like this:

```text
Name Unturned via playit.gg
Map PEI
Port 27015
MaxPlayers 8
Perspective Both
GSLT PASTE_YOUR_TOKEN_HERE
```

Replace `PASTE_YOUR_TOKEN_HERE` with your token. Keep it on one line and remove any older `GSLT` entry from this file. If you chose a different server ID in the startup file, edit that server's folder instead of `UnturnedServer`.

Keep the token private, and give each running server its own token. Friends only need the playit address, port, and optional join password.

Start `StartUnturnedServer.bat` again and wait for **Loading level: 100%**.

### Verify the token

After creating the tunnel below, connect using its public IPv4 address and first port. The server details should have an enabled **Join** button. Click it and confirm the world loads; a local connection alone doesn't verify public-IP joining.

If the details say the server isn't logged in, follow the [login-token troubleshooting steps](#the-server-details-say-a-login-token-is-required) below. The [official Unturned GSLT documentation](https://docs.smartlydressedgames.com/en/stable/servers/game-server-login-tokens.html) also explains token configuration and persistent Server Codes.

## Test the server locally

Open Unturned and choose **Play → Connect Directly**.

{{< image src="post-img/unturned-windows-connect-menu.jpg" alt="Connect Directly in Unturned's Play menu" >}}

Enter the following details:

```text
Host or Server Code: 127.0.0.1
Port: 27015
Password: the server password, if you set one
```

Click **Connect**, check the server name and map, then click **Join**. Wait until your character has loaded into the world before moving on.

If the game is on a different computer in your home network, use the server computer's LAN address instead of `127.0.0.1`. On Windows, open **Settings → Network & internet**, open the active connection's properties, and look for **IPv4 address**.

## Create the playit tunnel

Keep the playit agent running on the server computer. Open [your tunnels](https://playit.gg/account/tunnels) and choose **new tunnel**.

1. Give the tunnel a name, such as **Unturned**
2. Choose **Unturned** as the tunnel type
3. Select **Playit Network → Global Anycast** for the free endpoint shown here
4. Select the agent running on your server computer
5. Set the origin configuration as follows, then create the tunnel

```text
Local IP: 127.0.0.1
Local Port: 27015
Proxy Protocol: None
```

{{< image src="post-img/unturned-windows-tunnel-setup.png" alt="New Tunnel form with name Unturned, Unturned preset, Global Anycast endpoint, Windows Server agent, and origin 127.0.0.1:27015 with no Proxy Protocol" >}}

Run the playit agent on the same computer as the Unturned server and use `127.0.0.1` as the Local IP.

The preset supplies two consecutive public ports and forwards them to two consecutive local ports. With the settings above:

| Purpose | Public port in this example | Local port |
| --- | --- | --- |
| Server query / Connect Directly | 6644 | 27015 |
| Game traffic | 6645 | 27016 |

Your public ports will be different. Use the first public port when connecting. Keep `Port 27015` in `Commands.dat` and `Local Port 27015` in playit for this setup.

Unturned uses [two consecutive UDP ports](https://docs.smartlydressedgames.com/en/stable/servers/port-forwarding.html). The playit **Unturned** preset exposes both TCP and UDP; use that preset for the configuration shown here.

## Join through playit

Copy the **numeric IPv4 address** from the top of the tunnel page, along with the **first** port in the range. Use the address with four numbers separated by dots, rather than the hostname, for this setup.

{{< image src="post-img/unturned-windows-tunnel.jpg" alt="Unturned playit tunnel showing its public hostname and two-port range" >}}

In Unturned, return to **Play → Connect Directly**. For the example shown, enter:

```text
Host or Server Code: 147.185.221.217
Port: 6644
Password: the server password, if you set one
```

Replace the IP and port with your own tunnel's values. Click **Connect**, then **Join** on the server details screen.

{{< image src="post-img/unturned-windows-direct-connect.jpg" alt="Unturned Connect Directly filled with the tunnel's public IPv4 address and first port" >}}

Once the world loads, you're ready to play.

{{< image src="post-img/unturned-windows-gameplay.jpg" alt="Playing on the PEI dedicated server after joining through the playit tunnel" >}}

Share your public IPv4 address, first port, and server password with your friends. Keep both the dedicated server and playit agent running while anyone is playing.

> The console also shows an Unturned Server Code. Use the playit IPv4 address for this guide's connection test so you're testing the tunnel.

## Save and stop the server

Enter `Save` in the server console to save while the server stays running. When you're finished, enter `Shutdown` to save and close it. Unturned has [no built-in autosave](https://docs.smartlydressedgames.com/en/stable/servers/server-hosting.html), so save regularly.

Back up `U3DS\Servers\UnturnedServer` while the server is stopped. Restart with the same batch file to continue that world.

## Troubleshooting

### The local connection fails

Wait for **Loading level: 100%**. Check that `Commands.dat` is in the `Server` subfolder for the ID in your startup file, and that its port matches the one you're entering. Also check the password and update both the game and dedicated server through Steam.

Check that Windows Firewall permits the dedicated server's UDP traffic on ports `27015` and `27016` for the network profile in use.

### Local joining works, but the playit address fails

Check that the agent is online, the tunnel is enabled, and the origin points to the correct computer. For the configuration in this guide, the local port must be `27015`. Join using the tunnel's first public port, and keep Proxy Protocol set to **None**.

Make sure the tunnel covers both consecutive ports. Seeing the server details screen only proves that queries work; click **Join** and confirm that the world loads too.

### Clicking Connect with the hostname does nothing

Try the tunnel's numeric IPv4 address instead. During testing with Unturned 3.26.3.13, the tunnel hostname resolved to IPv6 first and the client logged `Unable to parse resolved address`. Using the IPv4 address avoids that hostname parsing problem.

### The server doesn't appear in the Internet server list

That's expected with `+LanServer`, even after adding the login token. Share the tunnel address for direct joining. Internet server-list hosting is a separate setup; this guide keeps the LAN startup argument.

### The server details say a login token is required

Stop the server with `Shutdown`, check the `GSLT` line in the correct `Commands.dat`, and restart. Keep `+LanServer` in the startup file. A successful local join doesn't test whether the server has logged in for public-IP connections.

Check the following:

* The token was created for app ID **304930** and hasn't been deleted or expired.
* Another running server isn't using the same token.
* The `GSLT` line contains the actual token, with no placeholder or extra spaces inside it.
* The server restarted after the change. Cancel the old server-details screen and connect again to load fresh details.

If Steam regenerated your tokens after a password reset, copy the current token from the management page into `Commands.dat` and restart the server. If a token is exposed, replace it through Steam and update the server configuration.

{{< image src="post-img/unturned-windows-login-required.png" alt="Unturned disables joining through a public IP when the server has no Game Server Login Token" >}}

+++
title = "Setting up FiveM with playit"
tags = ["GTA V", "FiveM", "guide"]
description_file = "descriptions/playit-fivem.txt"
+++

This guide will walk you through how to host a FiveM server through playit.gg

## Requirements
* **GTA V Legacy**

### Server

* **FiveM Server Guide - [docs.fivem.net](https://docs.fivem.net/docs/server-manual/setting-up-a-server/)**  
* **FiveM Client Setup - [fivem.net](https://fivem.net/)**
* **Server Registration Key - [portal.cfx.re](https://portal.cfx.re/servers/registration-keys)**
* **TxAdmin Download - [runtime.fivem.net](https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/)**

> We've decided to use [TxAdmin](https://docs.fivem.net/docs/server-manual/setting-up-a-server-txadmin/) for this demonstration. Other ways do exist and work with playit. If you are unsure how to set up a server, feel free to ask in the **[Discord](https://discord.gg/AXAbujx)**!

### Creating the server
First, unzip the file called `server.7z`. Inside, you will see these contents. If they don't look exactly like this, sort by `Type`.

{{< image src="post-img/playit-fivem-txadmin-serverfiles.png" alt="FiveM Server Files" >}}

Double-click and execute `FxServer.exe`. This will open a console window and a webpage where you can then configure the server. The PIN should be autofilled.

{{< image src="post-img/playit-fivem-fxserver-console-console.png" alt="FiveM Server Console, 1" >}}

{{< image src="post-img/playit-fivem-fxserver-console-web.png" alt="FiveM Server Console, 2" >}}

Continue to `Link Account`. If you do not have an account, create one and then return to this step. If you do, continue signing in.  

{{< image src="post-img/playit-fivem-txadmin-authorisation-web.png" alt="FiveM TxAdmin Authorisation, 1" >}}

After account creation, set a password for your account. Continue registration.

{{< image src="post-img/playit-fivem-txadmin-console-account-web.png" alt="FiveM TxAdmin Authorisation, 2" >}}

Now, we can create a server using the guided setup shown on the next page.
Set a name for this new server.

{{< image src="post-img/playit-fivem-txadmin-console-newserver-name-web.png" alt="FiveM TxAdmin Server Setup, 1" >}}

For the deployment type, we recommend the `Popular Recipes`

{{< image src="post-img/playit-fivem-txadmin-console-newserver-deployment_type-web.png" alt="FiveM TxAdmin Server Setup, 2" >}}

Choose a template that you like. This changes the behaviour and features on the server.
We'll just be using the FiveM Basic Server - it's the first one in the list.

{{< image src="post-img/playit-fivem-txadmin-console-newserver-template-web.png" alt="FiveM TxAdmin Server Setup, 3" >}}

Choose a place to save your server files. The auto generated name is fine, and does not need renamed. 

{{< image src="post-img/playit-fivem-txadmin-console-newserver-filepath-web.png" alt="FiveM TxAdmin Server Setup, 4" >}}

Go to Recipe Deployer.

{{< image src="post-img/playit-fivem-txadmin-console-newserver-finish-web.png" alt="FiveM TxAdmin Server Setup, 5" >}}

Here is where you change visibility settings. We recommend only changing the name and description

{{< image src="post-img/playit-fivem-txadmin-console-newserver-deployer-1-web.png" alt="FiveM TxAdmin Server Setup, 6" >}}

You need a registration key to validate your server.
Go to [portal.cfx.re](https://portal.cfx.re/servers/registration-keys) and create a new key - copy this.

{{< image src="post-img/playit-fivem-txadmin-console-newserver-cfxre-new-key-web.png" alt="FiveM TxAdmin Server Setup, 7" >}}

Paste this in Recipe Deployer, Step 2. Click `Run Recipe`.

{{< image src="post-img/playit-fivem-txadmin-console-newserver-deployer-2-web.png" alt="FiveM TxAdmin Server Setup, 8" >}}

Change the basic configuration file if you wish. If everything looks correct, click `Save & Run Server`

{{< image src="post-img/playit-fivem-txadmin-console-newserver-deployer-4-web.png" alt="FiveM TxAdmin Server Setup, 9" >}}

You now have the ability to join the server on your local network, as well as logs and a command line.

{{< image src="post-img/playit-fivem-txadmin-console-newserver-completed.png" alt="FiveM TxAdmin Server Setup, 10" >}}

### Creating a tunnel
> This server uses `TCP/UDP 30120`, which means that free users will not be able to create this - however, you can check out **[playit premium](https://playit.gg/account/billing/shop/premium)**

Set up the tunnel as follows:

```text
Tunnel Type: FiveM
Port Count: 1
Local Port: 30120
```

{{< image src="post-img/playit-fivem-tunnelconfig.png" alt="FiveM Tunnel Config" >}}

{{< image src="post-img/playit-fivem-tunnelinfo.png" alt="FiveM Tunnel (Info)" >}}

Your tunnel has been created, and the next time you open `FXServer.exe`, the server will run and a new browser tab for TxAdmin should open

### Using a tunnel for TxAdmin's panel (optional)

Set up the tunnel as follows:

```text
Tunnel Type: HTTPs
Port Count: 1
Local Port: 40120
```

{{< image src="post-img/playit-fivem_txadmin-tunnelconfig.png" alt="FiveM TxAdmin Config" >}}

{{< image src="post-img/playit-fivem_txadmin-tunnelinfo.png" alt="FiveM TxAdmin Info" >}}

## Connecting to the server

Inside of FiveM, click on Play, and go to the server list. We'll want to direct connect.
To do this, we'll type in `>IP_Address:Port`. This will be different for everyone.

{{< image src="post-img/playit-fivem-fivem_connect.png" alt="FiveM Game Server" >}}

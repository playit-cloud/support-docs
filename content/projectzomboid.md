+++
title = "Project Zomboid Dedicated Server Guide"
tags = ["project zomboid", "pz", "guide"]
+++

# Using playit for Project Zomboid

---

## Requirements

* **Project Zomboid (game)**
* **Project Zomboid Dedicated Server**
* **playit agent**

---

## Setting Everything Up

Assuming you already own Project Zomboid on Steam, you already have access to the dedicated server software.

1. Open your **Steam Library**
2. Search for **Project Zomboid** (the server is usually hidden until searched)
3. Install **Project Zomboid Dedicated Server**

![PZ on Steam]({{< static "post-img/playit-pz-steam.png" >}})

---

## Verify the Server Runs

After installing the server:

1. **Do not launch it from Steam**
2. Right‑click **Project Zomboid Dedicated Server**
3. Select **Manage → Browse local files**

![PZ on Steam Options]({{< static "post-img/playit-pz-steambrowsefiles.png" >}})

The server directory will look similar to this:

![PZ Server Files]({{< static "post-img/playit-pz-serverfiles.png" >}})

Both the 32‑bit and 64‑bit versions work:

* `StartServer32.bat`
* `StartServer64.bat`

Double‑click either file to start the server once. After it finishes initialization, you can close it.

---

## Using playit.gg to Share the Server

Create and claim a new **playit.gg agent**, then create your first tunnel.

Project Zomboid normally uses the following ports:

* `16261` (main port)
* `16262` (secondary UDP port)

We will adjust these to work with playit.gg.

---

## Create the Tunnel

Create and configure your tunnel as follows:

* **Type:** Project Zomboid (game)

![playit tunnel config]({{< static "post-img/playit-pz-addtunnel.png" >}})

At this point, the tunnel will be active, but the game server will **not yet be reachable**. This is because the local server ports must match the tunnel’s assigned public ports.

### Dedicated IP Users

If you are using a **dedicated IP** from playit.gg:

* You may keep the default ports
* Set the local port to `16261`
* No changes to `servertest.ini` are required unless you want to modify game rules

![playit local address]({{< static "post-img/playit-pz-localaddress.png" >}})

---

## Configure Server Ports

Navigate to your Project Zomboid server configuration folder:

```text
C:\Users\User\Zomboid\Server
```

Inside, you will find files like:

![PZ Server Config Files]({{< static "post-img/playit-pz-configfiles.png" >}})

### Edit `servertest.ini`

Open `servertest.ini` and locate:

```ini
DefaultPort=16261
```

Change this to match the **public port assigned by playit.gg**.

**Example:**

```ini
DefaultPort=10233
```
![PZ Config File]({{< static "post-img/playit-pz-configfile.png" >}})


---

### Configure the Second Port

Project Zomboid uses **two sequential ports**.

If your public port is `10233`, the second port will be `10234`

In `servertest.ini`, find:

```ini
UDPPort=16262
```

Change it to:

```ini
UDPPort=10234
```

Save the file.

---

## Connecting to the Server

1. Start the Project Zomboid server
2. Open your playit.gg tunnel
3. Copy the **numeric IP address and port**

![playit tunnel address]({{< static "post-img/playit-pz-tunneladdress.png" >}})

**Example:**

```text
147.185.221.181:10233
```

### Join in Project Zomboid

1. Launch **Project Zomboid**
2. Click **Join**
3. Enter the tunnel IP and port on the right‑hand side
4. Under **Connection Options**, make sure:

```text
Use Steam Relay = unchecked
```

![Adding the server]({{< static "post-img/playit-pz-joinserver.png" >}})

5. Click **Add**
6. Select the server from the list

![Joining the server]({{< static "post-img/playit-pz-serverlist.png" >}})
![Joining the server]({{< static "post-img/playit-pz-connecting.png" >}})
---

## Server Is Live

The game server will now:

* Serve all game assets
* Apply server settings
* Store player data

To modify server settings, see the **[Project Zomboid Server Wiki](https://pzwiki.net/wiki/Dedicated_server)**.

---

## Troubleshooting

### Closed Port Warning
![Warning: Closed Port]({{< static "post-img/playit-pz-warningclosedport.png" >}})

If you see a **closed port** warning:

* Double‑check that **Use Steam Relay** is **disabled** in the server list
* Confirm `DefaultPort` and `UDPPort` match the playit.gg tunnel ports

---

## Done
Your Project Zomboid server should now be up and shared using playit.

+++
title = "Termux + Playit Minecraft Server Guide"
tags = ["minecraft", "termux", "playit"]
+++

# Termux + Playit Minecraft Server Setup Guide

This guide walks you through setting up a **Minecraft 1.21.11 vanilla server** in an **Android device** using `Termux`, and then sharing it to the internet using `Playit`.

> **⚠️ Note: Running servers on Android is for small private servers. Performance depends heavily on your device.**

> Official Minecraft server documentation:  
> https://minecraft.fandom.com/wiki/Tutorials/Setting_up_a_server

## Requirements

* Android device  
* Latest Termux APK from F-Droid  
  https://f-droid.org/packages/com.termux/  
* Java (OpenJDK)  
* A playit account

## Install Java
> Install Java 21 (recommended for Minecraft 1.21.x):

```bash
pkg update && pkg upgrade
pkg install openjdk-21a
java --version
```
> Run `pkg update && pkg upgrade` always to keep packages updated to avoid **ERRORS**

> If you need a different Java version later, replace `21` with the desired version number, for example:
> ```bash
> pkg install openjdk-17
> ``` 
Expected output of `java --version`:
```
openjdk "version"
```
## Download Minecraft Vanilla server.jar

To download the server.jar:

- Go to [MCVersions](https://mcversions.net/)
- Find the version you want (for this guide: **1.21.11**)
- Click **Download** → **Download server.jar**
- Click `Copy link address`
![Copy Link Address]({{< static "post-img/termux-mc-download.png" >}})

## Download server.jar in Termux

Use `wget` (available by default in Termux):

```bash
wget https://piston-data.mojang.com/v1/objects/64bb6d763bed0a9f1d632ec347938594144943ed/server.jar
```

Verify `server.jar` exists:

```bash
ls
```

## Run the server `ONCE` to generate files

```bash
java -jar server.jar echo "eula=true" > eula.txt
```
Verify `server.properties` `eula.txt` `versions` exist:

```bash
ls
```

## Installing Ubuntu 

```bash
pkg install proot-distro
proot-distro install ubuntu
proot-distro login ubuntu
```

Once logged in, you should see:

```text
root@localhost:~#
```

> Now we are inside Ubuntu, time to install `Playit`

## Install Playit Agent using Raw Binaries (aarch64)

- Go to [Playit Linux Download Website](https://playit.gg/download/linux) 
  ![Copy Link Address]({{< static "post-img/playit-download-aarch64.png" >}})
- Press and Hold `aarch64`
- Click `Copy Link Address`
> Why `aarch64`?
- Because termux uses `aarch64` (or ARM64) **architecture**

type this command to check termux **architecture**
```bash
uname -m
```
Expected Output
```
root@localhost:~# uname -m
aarch64
```

- Press and Hold `aarch64` and click `Copy Link Address`
- Go back to `Termux` and type:
```bash
wget https://github.com/playit-cloud/playit-agent/releases/download/v0.16.5/playit-linux-aarch64
```

>Check if playit is installed
```bash
ls
```

Expected Output
```
rooot@localhost:~# ls
playit-linux-aarch64
```
> Make the file execituble and run it:
```bash
chmod +x playit-linux-aarch64
./playit-linux-aarch64
```
> This lines should show if done correctly
```
Line 1 : no command provided, doing auto run
Line 2 : checking if secret key is valid
Line 3 : Visit link to setup https://playit.gg/claim/ "secret-key"

secret-key are random numbers and letters
```

> Follow the steps after visting the link provided by `Playit`
- Create Minecraft Java tunnel and click `Add Tunnel` 
![Create Minecraft Tunnel]({{< static "post-img/playit-create-tunnel.png" >}})
## Starting the minecraft server
- Go to termux and starting from the left side of your phone, swipe from `LEFT` to `RIGHT`
- Click new session

![Create Minecraft Tunnel]({{< static "post-img/termux-session.png" >}})
![Create Minecraft Tunnel]({{< static "post-img/termux-session2.png" >}})
![Create Minecraft Tunnel]({{< static "post-img/termux-session3.png" >}})

- Start the server:
```bash
java -Xms1024m -Xmx3072m -jar server.jar nogui
```
>RAM Recommendations

- Low-end devices: `512M` – `1024M`

- Medium devices: `2048M` – `3072M`

- High-end devices: `4096M` – `6114M`

## What does `-Xms` `-Xmx` mean?
> `-Xms` (Initial Heap Size)
- Sets the minimum amount of `RAM` that the `Java Virtual Machine (JVM)` will allocate to your server when it starts
- Can be said this is the starting memory the JVM will have

> `-Xmx` (Maximum Heap Size)
- Sets the maxmimum amount of `RAM` the `JVM` is allowed to use
- Can be said this is where it sets the boundary to avoid using all your `RAM`

> Congrats! You have now made a minecraft server using your Android Phone!

## How to join?

- Go to termux and starting from the left side of your phone, swipe from `LEFT` to `RIGHT`
- Click the terminal named `root@localhost: ~`
- It should show your minecraft java tunnel like this
```
                                                        
playit (v0.16.5): 1768426907033 tunnel running, 1 tunnels registered


TUNNELS
canadian-external.gl.joinmc.link => 127.0.0.1:25565 (minecraft-java)
```

- Enter your `Minecraft Java Tunnel address` (e.g. `canadian-external.gl.joinmc.link`) in the Server Address, or use Direct Connect and paste it there.
> Enjoy playing with your friends!

## (Optional) For cracked clients joining the server
- Stop the server if it is running by typing `/stop`
- Run:
```bash
echo "online-mode=false" > server.properties
```
> This will set `online-mode` to `false` allowing cracked clients to join
> Start the server again and cracked clients should be able to join now!
+++
title = "Termux + Playit Minecraft Server Guide"
tags = ["minecraft", "termux", "playit"]
+++

# Termux + Playit Minecraft Server Setup Guide

This guide walks you through setting up a **Minecraft 1.21.11 vanilla server** on an **Android device using Termux**, and then sharing it to the internet using **playit**.

> **⚠️ Note: Running servers on Android is for small private servers. Performance depends heavily on your device.**

> Official Minecraft server documentation:  
> https://minecraft.fandom.com/wiki/Tutorials/Setting_up_a_server

---

## Requirements

* Android device  
* Latest Termux APK from F-Droid  
> https://f-droid.org/packages/com.termux/  
* Java (OpenJDK)  
* Internet connection  
* A playit account  

---

## Install Termux Dependencies

Update Termux packages:

```bash
pkg update && pkg upgrade
```
## Install Java 21 

> You can install another java by changing the number
e.g `openjdk-25`|`openjdk-17`
```bash
pkg install openjdk-21

# Verify if Java 21 is installed 
java --version
```
Expected Output

```nginx
~ $ java --version
openjdk 21.0.9 2025-10-21
OpenJDK Runtime Environment (build 21.0.9)
OpenJDK 64-Bit Server VM (build 21.0.9, mixed mode)
```

## Download Minecraft Vanilla Server.Jar
To download the server.jar:

- Go to [MCVersions](https://mcversions.net/)
- Find the version you want
> For this example we will use 1.21.11
- Click **Download**
- Click **Download server.jar**
- Click and Hold **Download server.jar**
- Click **Copy Link Address**

## Go back to *Termux* and download the server.jar via `wget` or `curl` 

```bash
# Via `wget`

wget https://piston-data.mojang.com/v1/objects/64bb6d763bed0a9f1d632ec347938594144943ed/server.jar
```
```bash
# Via `curl`

curl -L -O https://piston-data.mojang.com/v1/objects/64bb6d763bed0a9f1d632ec347938594144943ed/server.jar
```
## Make sure the file is downloaded by running the command
`ls`

```nginx
~ $ ls
server.jar
```
## Run the server.jar to create the files

```bash
java -jar server.jar
```
> You will get prompted by the server to accept the EULA
```nginx
[ServerMain/WARN]: Failed to load eula.txt
[19:04:13] [ServerMain/INFO]: You need to agree to the EULA in order to run the server. Go to eula.txt for more info.
```
>Edit the **eula.txt** and change **eula=false** to **eula=true**

```bash
nano eula.txt
```
> You should see this lines inside

```nginx
#By changing the setting below to TRUE you are indicati>
#Wed Jan 14 19:04:13 GMT 2026
eula=false
```
>Use `Arrow Keys` `↑ → ↓ ←`to move

> After changing `false` to `true`, click `CTRL` at termux then `x` from your keyboard

> Click `Y` and press `⏎` to save it

## Installing Ubuntu via `proot-distro` (Required)

```bash

# Install proot-distro
pkg install proot-distro

# Install Ubuntu

proot-distro install ubuntu

# Login to ubuntu

proot-distro login ubuntu
```

Expected Output
```nginx
~ $ proot-distro login ubuntu
root@localhost:~#
```
> Now we are inside Ubuntu, time to install `Playit`

## Install Playit Agent using Raw Binaries (aarch64)

- Go to [Playit Linux Download Website](https://playit.gg/download/linux) 
- Find `Raw Binaries` section and you should see this files

`x86-64` `i686` `armv7` `aarch64`
> Why `aarch64`?
- Because termux uses `aarch64` (or ARM64) **architecture**

type this command to check termux **architecture**
```bash
uname -m
```
Expected Output
```nginx
root@localhost:~# uname -m
aarch64
```

- Press and Hold `aarch64` and click `Copy Link Address`
- Go back to `Termux` and type this command:
```bash
# Install via wget
wget https://github.com/playit-cloud/playit-agent/releases/download/v0.16.5/playit-linux-aarch64
```

```bash
#Install via curl
curl -L -O https://github.com/playit-cloud/playit-agent/releases/download/v0.16.5/playit-linux-aarch64
```

>Check if playit is installed
```bash
ls
```

Expected Output
```nginx
rooot@localhost:~# ls
playit-linux-aarch64
```

### (Optional) You can rename the file so you can execute it faster
```bash
mv playit-linux-aarch64 playit
```

> Make the file execituble via `chmod +x`
```bash
chmod +x playit-linux-aarch64

# If you renamed it, type the file name instead
```
> Run the file
```bash
./playit
```
> This lines should show if done correctly
```nginx
Line 1 : no command provided, doing auto run
Line 2 : checking if secret key is valid
Line 3 : Visit link to setup https://playit.gg/claim/ `secret-key`

# secret-key are random numbers and letters
```

> Follow the steps after visting the link provided by `Playit`
- Create Minecraft Java tunnel

## Starting the minecraft server
- Go to termux and starting from the left side of your phone, swipe from `LEFT` to `RIGHT`
- Click new session
- Run the `ls` command to see if server.jar is present

Expected Output
```nginx
server.jar
```

## Now run the server with allocated ram

```bash
java -Xms1024m -Xmx3072m -jar server.jar nogui
```
>RAM Recommendations

-Low-end devices: `512M` – `1024M`

-Medium devices: `2048M` – `3072M`

-High-end devices: `4096M` – `6114M`

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
```nginx
                                                        
playit (v0.16.5): 1768426907033 tunnel running, 1 tunnels registered


TUNNELS
canadian-external.gl.joinmc.link => 127.0.0.1:25565 (minecraft-java)
```

- Type your **Minecraft Java Tunnel** server address (in this example it is `canadian-external.gl.joinmc.link`) into your minecraft `Server Address` text box
- Or do `Direct Connect` and type your tunnel server address
> Enjoy playing with your friends!

## (Optional) For cracked clients joining the server
- Stop the server if it is running by typing `/stop`
- type this command
```bash
nano server.properties
```
- This lines should show

```
#Minecraft server properties
#Thu Jan 15 05:56:05 PST 2026
accepts-transfers=false
allow-flight=false
broadcast-console-to-ops=true
broadcast-rcon-to-ops=true
bug-report-link=
difficulty=normal
enable-code-of-conduct=false
enable-jmx-monitoring=false
enable-query=false
enable-rcon=false
enable-status=true
enforce-secure-profile=true
enforce-whitelist=false
entity-broadcast-range-percentage=100
force-gamemode=false
function-permission-level=2
gamemode=survival
generate-structures=true
generator-settings={}
hardcore=false
hide-online-players=false
initial-disabled-packs=
initial-enabled-packs=vanilla
level-name=MyMinecraftServer
level-seed=
level-type=default
log-ips=true
management-server-allowed-origins=
management-server-enabled=false
management-server-host=localhost
management-server-port=0
management-server-secret=f7v6xILe2XMY69tS57ssacmWWS5Cb3n6cROBeKXk
management-server-tls-enabled=true
management-server-tls-keystore=
management-server-tls-keystore-password=
max-chained-neighbor-updates=1000000
max-players=20
max-tick-time=60000
max-world-size=29999984
motd=Hosted using squidservers.com \:)
network-compression-threshold=256
online-mode=true
op-permission-level=4
pause-when-empty-seconds=60
player-idle-timeout=0
prevent-proxy-connections=false
query.port=25565
rate-limit=0
rcon.password=
rcon.port=25575
region-file-compression=deflate
require-resource-pack=false
resource-pack=
resource-pack-id=
resource-pack-prompt=
resource-pack-sha1=
server-ip=
server-port=25566
simulation-distance=7
spawn-protection=0
status-heartbeat-interval=0
sync-chunk-writes=true
text-filtering-config=
text-filtering-version=0
use-native-transport=true
view-distance=7
white-list=false
```

- Look for `online-mode=true`
- Set it to `false`

> Start the server again and cracked clients should be able to join now!

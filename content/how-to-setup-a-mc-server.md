+++
title = "How to setup a Minecraft Java Server"
tags = ["minecraft", "guide"]
+++

When making a Minecraft server there are a lot of options. This guides currently covers setting up a Survival Multiplayer Server without mods. We'll be releasing more guides in the future on how to start a server with mods.

## Create a Vanilla Survival Multiplayer Server (MSP)
Follow these steps and you should have a public Minecraft Java server up in no time.

**1. Download and install Java**

You can download the latest version of Java from [Oracle](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html).

**2. Download the offical Minecraft Server**

Download this from [minecraft.net](https://www.minecraft.net/en-us/download/server)


**3. Create a folder for your minecraft server**

This folder can be named and located wherever you'd like. I do recommend making it something simple and easy to find. I like calling the folder `minecraft-server` and putting it in my home/User folder.

**4. Setup your minecraft server folder**

Move your downloaded `server.jar` file into minecraft folder.

> **On Windows:** create a new file named `run.bat`. {{< link "creating-a-bat-file" >}}

> **On MacOS / Linux:** create a new file named `run.sh`.

Edit your new file and set the text to be

```
java -Xmx1024M -Xms1024M -jar server.jar nogui
```

**5. Generate your server and accept the EULA**

With your `run` file created, let's start the server.

> **On Windows:** double click your `run.bat` folder

> **On MacOS / Linux:** open the terminal to your minecraft server folder and run `bash ./run.sh`.

The command line should show some logs and your minecraft server folder should be populated with new files and folders. Find and open the `eual.txt` file and replace `eula=false` with `eula=true`.

**6. Run and connect to your server**

Now with the eula accepted, run your server again following the same method in **5.**. Open Minecraft and try direct connecting using `127.0.0.1:25565`. If you're not able to connect, make sure your server is running. If everything looks good and you're not sure why you cannot connect, ask for help on our [discord](https://discord.gg/AXAbujx).

**7. Make your server public**

You can now connect to your server locally, let's make it public so friends can join. [Go to the interactive guide](https://playit.gg/guides/minecraft-java#true%2Ctrue).


## Rather watch at video tutorial?

{{< youtube _4WgER3o8mg >}}

+++
title = 'How to run playit.gg on Linux'
tags = ["linux"]
+++

If you're running on a Ubuntu or Debian based operating system to you can use `apt`.

```
curl -SsL https://playit-cloud.github.io/ppa/key.gpg | sudo apt-key add -
sudo curl -SsL -o /etc/apt/sources.list.d/playit-cloud.list https://playit-cloud.github.io/ppa/playit-cloud.list
sudo apt update
sudo apt install playit
```

----


Playit also releases raw binaries that you can download and run. You can download the latest version of the playit.gg program from [playit.gg/download](https://playit.gg/download).

When you try to run the program, you might get errors like

![linux bad run ubuntu]({{< static "post-img/linux-run-bad-ubuntu.png" >}})
![linux bad run cli]({{< static "post-img/linux-run-bad-cli.png" >}})

**The Fix**

You'll need to make the program runnable on linux. You can do this by running `chmod +x`.

```bash
cd ~/Downloads # cd into the folder where the playit program is located
chmod +x playit-{{< latest-version >}}
./playit-{{< latest-version >}}
```

To download and run the playit program you can use

```bash
wget https://playit.gg/downloads/playit-{{< latest-version >}}
chmod +x playit-{{< latest-version >}}
./playit-{{< latest-version >}}
```

If you're interested in running playit 24/7 on a linux computer/server, see {{< link "host-247-with-playit" >}}

+++
title = 'How to run playit 24/7 on Linux'
tags = ["linux"]
+++

### Using systemd (preferred)

Starting with version `0.15.0` when you install the playit program via `apt-get` we add a systemd unit which makes it easy to run playit in the background. Not sure how to install playit on linux or with `apt-get`? Check this out: {{< link "run-on-linux" >}}.


To start the playit agent in the background you can run
```
sudo systemctl start playit
```

If you want the playit agent start when you boot up your computer you can run
```
sudo systemctl enable playit
```


Then to add (claim) the playit agent to your account you can run

```
playit setup
```


### Using tmux

For this guide we'll be using `tmux`. To get started, run the `tmux` command in your terminal. You terminal should look like

{{< image src="post-img/linux-tmux-terminal.png" alt="linux bad run ubuntu" >}}

Now inside of the tmux session run the playit program

```
./playit-linux-amd64
```

If you're unable to run the playit program see 
* {{< link "run-on-linux" >}}


With the playit program now running you can use the following keyboard combinations

* `Ctrl-b + d` to put the tmux session in the background
* `Ctrl-b + c` to create a new window to run another program (like the Minecraft Server)
* `Ctrl-b + 0` to view the first window, similary `Ctrl-b <num>` will let you go between windows

If you press `Ctrl-b + d` and put the tmux session in the background, you can always get it back by running the command

```
tmux attach
```

+++
title = "How to find your computer's LAN Address"
tags = ["guide", "lan", "ipv4"]
hidden = true
+++

## What is a LAN address?

A LAN address (short for local area network) is a network closed off from the internet. This is often times the network in your house that your devices connect to. LAN addresses are assigned to devices to communicate with your router and to each other within the network.

## How to find your compputer's LAN address

# Windows

On Windows, hold the Windows key, and press "R". This will open up a box that says "Run". In this box type in "cmd" and press enter. A new window will pop up and you will see a terminal-like window. In here, you can type "ipconfig" and it will show some information. Search for `IPv4 Address`. It should look something like `10.0.0.x` or `192.168.x.x`. This is your LAN address, it is safe to share as almost all networks have this address and it is not specific to you.

# Linux/Ubuntu

On Linux this is a little more complicated. If you are in a Linux Desktop environment, you can press ctrl + alt + t, this will open a new terminal for you. Assuming you are now in the linux terminal, type in `ip a` and press enter. You may have to scroll up, but often times this will be the second one on the list. A example of what you should find is below.


```
2: ens18: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 52:0c:23:6a:33:92 brd ff:ff:ff:ff:ff:ff
    inet 10.0.0.x/24 brd 10.0.0.255 scope global dynamic ens18
       valid_lft 64259sec preferred_lft 64259sec
```
       
Where this says `inet 10.0.0.x/24`, this is your local IP address. (`10.0.0.x`) (This may also show as `192.168.x.x`).

+++
title = "How to find your computer's LAN Address"
tags = ["guide", "lan", "ipv4"]
+++


# Windows

If your using Windows, you can go to settings -> network and internet -> your wifi name. Then scroll down to where it says ipv4 address and copy that. That is your LAN address.

![img]({{< static "post-img/lanaddress1.png" >}})
![img]({{< static "post-img/lanaddress2.png" >}})


# Apple / Macos

Type the following in a Terminal window:

`networksetup -listallhardwareports`

The “Ethernet Address” field for the ethernet hardware port is your MAC address. If there are too many ports listed and you’re not sure which is your active ethernet port, try one of the options below.

Recent macOS (System Settings)

- Go to the Apple menu > System Settings > Network.
- Click on the wired network device you plan on using, then click Details.
- Click on the Hardware label in the left column. The MAC address will be on the right.
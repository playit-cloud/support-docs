+++
title = 'Update your DNS server on Windows'
tags = ["windows", "dns"]
+++

Open the windows start menu and search for `Control Panel`

![windows control panel]({{< static "post-img/windows-control-panel.png" >}})

Open `Network and Internet` from the `Control Panel`

![windows control panel]({{< static "post-img/windows-network-and-internet.png" >}})

Next, open `Network and Sharing Center`

![windows control panel]({{< static "post-img/windows-network-and-sharing.png" >}})

On the left, in the side panel click `Change adapter settings`

![windows control panel]({{< static "post-img/windows-change-adapter-settings.png" >}})

In the list, find and select `Internet Protocol Version 4 (TCP/IPv4)`

![windows control panel]({{< static "post-img/windows-open-ipv4-settings.png" >}})

Finally, on the bottom of the newly opened window select `Use the following DNS server addresses` and set `Preferred DNS server` to `8.8.8.8` and `Alternative DNS server` to `8.8.4.4`.

![windows control panel]({{< static "post-img/windows-set-dns.png" >}})

Once done, press `OK` and you should be good to go.

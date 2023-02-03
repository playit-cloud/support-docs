+++
title = 'Update your DNS server on Windows'
tags = ["windows", "dns"]
+++

#### Open control panel
Open the windows start menu and search for `Control Panel`

![windows control panel]({{< static "post-img/windows-control-panel.png" >}})

#### Open Network and Internet
Open `Network and Internet` from the `Control Panel`

![network and internet]({{< static "post-img/windows-network-and-internet.png" >}})

#### Open Network and Sharing Center
Next, open `Network and Sharing Center`

![network and sharing]({{< static "post-img/windows-network-and-sharing.png" >}})

#### Go to adapter settings
On the left, in the side panel click `Change adapter settings`

![adapter settings]({{< static "post-img/windows-change-adapter-settings.png" >}})

#### Go to your adapter's properties
Find the network adapter that you are currently using. There might be multiple adapters enabled. If this is the case, you may need to repeat the following instructions for each network adapter.

![adapter properties]({{< static "post-img/windows-adapter-properties.png" >}})

#### Go to your IPv4 properties
In the list, find and select `Internet Protocol Version 4 (TCP/IPv4)`

![ipv4 properties]({{< static "post-img/windows-open-ipv4-settings.png" >}})

#### Set your DNS for IPv4
On the bottom of the newly opened window select `Use the following DNS server addresses` and set `Preferred DNS server` to `8.8.8.8` and `Alternative DNS server` to `8.8.4.4`.

![set ipv4 dns]({{< static "post-img/windows-set-dns.png" >}})

Once done, press `OK` to save your DNS for IPv4.

#### Go to your IPv6 properties
In the list, find and select `Internet Protocol Version 4 (TCP/IPv4)`

![ipv4 properties]({{< static "post-img/windows-open-ipv6-settings.png" >}})

#### Set your DNS for IPv6
On the bottom of the newly opened window select `Use the following DNS server addresses` and set `Preferred DNS server` to `2001:4860:4860::8888` and `Alternative DNS server` to `2001:4860:4860::8844`.

![ipv4 properties]({{< static "post-img/windows-set-dns-ipv6.png" >}})

Once done, press `OK` to save your DNS for IPv6.


## Check that your DNS is set properly
Just to make sure everything is set properly we can do a little test. This will let us know what our computer is actually using as the DNS server.

**Open the command prompt**
Search for the `Command Prompt` program. You can also enter `cmd` into the run program.


#### Run in command prompt

```
ipconfig /all | findstr "DNS\ Servers"
```

The output will look like

```
DNS Servers ...........: <DNS SERVER>
```

If the `<DNS SERVER>` doesn't match what you entered earlier, something went wrong. Give this guide another try from the top. There can be multiple lines showing the multiple DNS servers you have set.

## Flush your DNS (optional)
DNS records are often saved on your computer. Somtimes upto 24 hours. You can clear these records by running `ipconfig /flushdns` in the command line.


#### Open the command prompt
Search for the `Command Prompt` program. You can also enter `cmd` into the run program.

![ipv4 properties]({{< static "post-img/windows-open-command-prompt.png" >}})

#### Run ipconfig /flushdns
Now in the command prompt, type the following and press enter

```
ipconfig /flushdns
```

![ipv4 properties]({{< static "post-img/windows-cmd-dns-flush.png" >}})

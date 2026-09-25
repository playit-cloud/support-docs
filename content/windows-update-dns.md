+++
title = 'Update your DNS server on Windows'
tags = ["Windows", "DNS"]
description_file = "descriptions/windows-update-dns.txt"
+++

#### Open Control Panel
Open the windows start menu and search for `Control Panel`

{{< image src="post-img/windows-control-panel.png" alt="Windows Control Panel" >}}

#### Open Network and Internet
Open `Network and Internet` from the `Control Panel`

{{< image src="post-img/windows-network-and-internet.png" alt="Network and Internet" >}}

#### Open Network and Sharing Center
Next, open `Network and Sharing Center`

{{< image src="post-img/windows-network-and-sharing.png" alt="Network and Sharing" >}}

#### Go to adapter settings
On the left, in the side panel click `Change adapter settings`

{{< image src="post-img/windows-change-adapter-settings.png" alt="Adapter Settings" >}}

#### Go to your adapter's properties
Find the network adapter that you are currently using. There might be multiple adapters enabled. If this is the case, you may need to repeat the following instructions for each network adapter.

{{< image src="post-img/windows-adapter-properties.png" alt="Network Adapter Properties" >}}

#### Go to your IPv4 properties
In the list, find and select `Internet Protocol Version 4 (TCP/IPv4)`

{{< image src="post-img/windows-open-ipv4-settings.png" alt="IPv4 Properties" >}}

#### Set your DNS for IPv4
On the bottom of the newly opened window select `Use the following DNS server addresses`  and enter these values:
> Preferred DNS server: `8.8.8.8`
> 
> Alternative DNS server: `8.8.4.4`.

{{< image src="post-img/windows-set-dns.png" alt="Set IPv4 DNS" >}}

Once done, press `OK` to save your DNS for IPv4.

#### Go to your IPv6 properties
In the list, find and select `Internet Protocol Version 6 (TCP/IPv4)`

{{< image src="post-img/windows-open-ipv6-settings.png" alt="IPv6 Properties" >}}

#### Set your DNS for IPv6
On the bottom of the newly opened window select `Use the following DNS server addresses`  and enter these values:
> Preferred DNS server: `2001:4860:4860::8888`
> 
> Alternative DNS server: `2001:4860:4860::8844`

{{< image src="post-img/windows-set-dns-ipv6.png" alt="IPv4 Properties" >}}

Once done, press `OK` to save your DNS for IPv6.

### Using DNS over HTTPs (DoH)
This will help prevent an ISP from blocking DNS, if the previous steps did not work.

Go to Settings

{{< image src="post-img/windows-settings.png" alt="Windows Settings" >}}

If you are using Wi-Fi, go to Wi-Fi. Otherwise, go to Ethernet, and select the network adapter you are currently using.

{{< image src="post-img/windows-network-wifi.png" alt="Windows Settings, Wi-Fi" >}}

{{< image src="post-img/windows-network-ethernet.png" alt="Windows Settings, Ethernet" >}}

Open `DNS Server Assignment` and select `Manual`. Turn on IPv4, and enter these values:

> Preferred DNS server: `8.8.8.8`
> 
> Alternative DNS server: `8.8.4.4`.

Make sure that you set DNS over HTTPS is set to `On (automatic template)`

{{< image src="post-img/windows-set-dns-doh.png" alt="Windows Settings, DoH v4" >}}

Turn on IPv6, and enter these values:
> Preferred DNS server: `2001:4860:4860::8888`
> 
> Alternative DNS server: `2001:4860:4860::8844`

{{< image src="post-img/windows-set-dns-doh-ipv6.png" alt="Windows Settings, DoH v6" >}}

## Check that your DNS is set properly
Just to make sure everything is set properly we can do a little test. This will let us know what our computer is actually using as the DNS server.

**Open the command prompt**
Search for the `Command Prompt` program. You can also enter `cmd` into the run program.


#### Run in command prompt

```batch
ipconfig /all | findstr "DNS\ Servers"
```

The output will look like

```text
DNS Servers ...........: <DNS SERVER>
```

If the `<DNS SERVER>` doesn't match what you entered earlier, something went wrong. Give this guide another try from the top. There can be multiple lines showing the multiple DNS servers you have set.

## Flush your DNS (optional)
DNS records are often saved on your computer. Sometimes upto 24 hours. You can clear these records by running `ipconfig /flushdns` in the command line.


#### Open the command prompt
Search for the `Command Prompt` program. You can also enter `cmd` into the run program.

{{< image src="post-img/windows-open-command-prompt.png" alt="Windows Command Prompt" >}}

{{< image src="post-img/windows-rundiag-cmd.png" alt="Windows Run Dialogue" >}}

#### Run `ipconfig /flushdns`
Now in the command prompt, type the following and press enter

`ipconfig /flushdns`

The output should look like this:

```batch
C:\Users\playit>ipconfig /flushdns

Windows IP Configuration

Successfully flushed the DNS Resolver Cache.
```

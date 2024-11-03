+++
title = "Frequently Asked Questions"
tags = ["playit"]
date = 2024-11-01T12:00:00
+++

### INSTALL/RUN      
<details>
<summary>Where do I get the playit installer/files?</summary>   

you can get them from:   
- [https://playit.gg/download/](https://playit.gg/download/)   
- [https://github.com/playit-cloud/playit-agent/releases](https://github.com/playit-cloud/playit-agent/releases)   
</details>

<details>
<summary>Which file should I use?</summary>   

- For windows with install use .msi.   
- For windows without install use .exe.
- For debian linux with install you can use the debian install script.   
- For linux without install you can use the binaries.   
- For devices running linux on arm use the arm binaries.   
</details>

<details>
<summary>How do I build for macOS?</summary>   

First you must have rust (the programming language) and cURL (client for URL) on your computer then you can run this command on the terminal.   
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

. $HOME/.cargo/env

git clone https://github.com/playit-cloud/playit-agent.git

cd playit-agent

cargo run --release --bin=playit-cli
```

</details>

<details>
<summary>How do I run playit on windows?</summary>   

- If you used the installer by default it will make a shortcut you can double click that shortcut.   
- If you downloaded the exe you can double click the exe.   
</details>

<details>
<summary>How do I run playit on linux?</summary>   

- To run playit in the foreground run `playit`   
- To run playit in the background/as a service first run `playit setup`   
start the service:   
`sudo systemctl start playit`   
stop the service:   
`sudo systemctl stop playit`  
auto run the service on startup:     
`sudo systemctl enable playit`   
disable autostart:   
`sudo systemctl disable playit`  
</details>

<details>
<summary>How do I run the binaries?</summary>   

- First go to the directory where the binaries are.   
- Make downloaded binary file executable by using the command:   
`chmod +x <filename>`   
- Execute the file using the command:
`./<filename>`   
NOTE: replace `<filename>` with the actual name of the file   
</details>

<details>
<summary>Playit is detected as a virus</summary>   

This is a false positive if you downloaded from the official sources, you can add an exception, if you however still don't trust it you can build it from source, the source is at [https://github.com/playit-cloud/playit-agent/](https://github.com/playit-cloud/playit-agent/) 
</details>

### PLAYIT ERRORS
<details>
<summary>Too many agents</summary>   

Delete some of your unused agents.  
</details>

<details>
<summary>Port limit reached</summary>   

Delete unused tunnels. Port count is the number of ports, not the port number of your server.   
</details>

<details>
<summary>An existing connection was forcibly closed by the remote host</summary>   

Ensure that your antivirus or firewall is not blocking your connection.   
</details>

<details>
<summary>Failed to lookup address information</summary>   

Here are the possible fixes:   
- Your dns has no records try this {{< link "update-your-dns" >}}.   
</details>

### PLAYIT FEATURES   
<details>
<summary>How do I set up the playit firewall?</summary>   

Here are some examples:   
- ipv4 and ipv6 deny all   
```
0.0.0.0/0 deny 
::/0 deny
```   
- ipv4 and ipv6 deny all except 69.63.176.13/32 range   
```
69.63.176.13/32 allow
0.0.0.0/0 deny 
::/0 deny
```   
</details>

<details>
<summary>How do I get more than one port in a tunnel?</summary>   

Simply increase the port count during tunnel creation, you cannot add more ports after the tunnel has been created. Increasing port count will give you sequential ports starting from the local port you specified.   
Here's an example:   
Port count 3   
Local port 1234   
you will get 1234, 1235, 1236   
   
The public facing port, the random port given by the tunnel, will also be sequential.  
Let's say you get a random port of 2222 continuing from the above example the ports will be mapped like this:   
1234 > 2222
1235 > 2223
1236 > 2224
</details>

<details>
<summary>How can I match my server port to the port given by the tunnel?</summary>   

You need to purchase a dedicated ip [https://playit.gg/account/billing/shop/dedicated-ip/](https://playit.gg/account/billing/shop/dedicated-ip/).   
</details>

<details>
<summary>How can I have more ports?</summary>   

You need to purchase premium it will give you 16 TCP and 16 UDP ports [https://playit.gg/account/billing/shop/premium/](https://playit.gg/account/billing/shop/premium/).   
</details>

<details>
<summary>How can I change the tunnel domain?</summary>   

You need to purchase a custom domain which will give you a custom subdomain. [https://playit.gg/account/billing/shop/custom-domain/](https://playit.gg/account/billing/shop/custom-domain/).   
</details>

<details>
<summary>Can I use my own domain?</summary>   

You will need premium, see guide {{< link "add-external-domain" >}}.   
</details>

<details>
<summary>How can I transfer a tunnel from one agent to another?</summary>   

- Go to the page of the tunnel you wish to move.   
- Scroll down to the attributes and look for "Agent".   
- Click on change and select the agent you wish to move it to.   
</details>

### CONNECTION   
<details>
<summary>How do I connect?</summary>   

- You can use the domain, it is labeled as sharable address/public address in the tunnel page. The server application needs to support SRV and the DNS server you're using should have a record to be able to use this.   
- You can use the domain:port, it's all grey at the upper left of the tunnel page next to the tunnel name and above the ip:port. The DNS server you're using should have a record to be able to use this.   
- You can use the ip:port, it's all numbers in grey at the upper left of the tunnel page next to the tunnel name and below the domain:port.   
</details>

<details>
<summary>I can't connect using the domain</summary>   

Here are the possible fixes:   
- Your server application does not support SRV, you must use the domain:port.   
- Your dns has no records try this {{< link "update-your-dns" >}}.   
</details>

<details>
<summary>I can't connect using the domain:port</summary>   

Here are the possible fixes:   
- Your dns has no records try this {{< link "update-your-dns" >}}.   
</details>

<details>
<summary>I can't connect using the ip:port</summary>   

Here are the possible fixes:   
- Ensure that nothing is blocking your connection such as your antivirus or firewall, make exceptions if they are blocking your connection.   
- Test if your ISP blocked your connection   
Ping your tunnel's IP from a terminal like cmd using the ping command, example:   
`ping 147.185.221.17`   
Ping the debug IP from a terminal like cmd using the ping command:  
`ping 147.185.221.1`   
If the debug IP responds (no packet loss) but the tunnel IP does not then you have to get playit premium and use a regional tunnel.
</details>

<details>
<summary>Unknown host</summary>   

Here are the possible fixes:   
- Your dns has no records try this {{< link "update-your-dns" >}}.   
</details>

<details>
<summary>I have a high ping</summary>   

- Try changing agent routing in agent settings or if you have premium create a regional tunnel.      
</details>

<details>
<summary>Does playit work for my application?</summary>   

- Playit normally works with server applications that can be port forwarded. Simply make a tunnel for the protocol(s) and port(s) that your server application is using.      
</details>

### PAYMENTS   
<details>
<summary>What payment methods do you accept?</summary>   

- Credit and debit cards that are supported by Stripe.
- Paypal.
</details>

<details>
<summary>How do I pay with Paypal?</summary>   

- Ensure that you add balance to your account before initiating a transaction, add balance at [https://playit.gg/account/billing/balance/paypal/credit](https://playit.gg/account/billing/balance/paypal/credit).   
- Paypal balance will be used before using your other payment methods. Ensure you have enough balance.
</details>

### CONTACTS   
<details>
<summary>Someone is abusing the playit service where can I send a report?</summary>   

- send an email to abuse@playit.gg and include details and proof.   
</details>

<details>
<summary>Do you have a support email?</summary>   

The support email is support@playit.gg you may use it if you have the following problems:   
- You need a refund.   
- You need to change email.   
- You were directed to send an email.   
If you have other concerns please go to our [discord server](https://discord.gg/AXAbujx) and create a thread on the #support channel   
</details>

<details>
<summary>Where can I get support?</summary>   

Please go to our [discord server](https://discord.gg/AXAbujx) and create a thread on the #support channel   
</details>
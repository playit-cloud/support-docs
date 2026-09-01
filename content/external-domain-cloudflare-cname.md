+++
title = "Add an external domain with Cloudflare (CNAME Gateway)"
tags = ["external-domain"]
description_file = "descriptions/external-domain-cloudflare.txt"
+++

## Before purchasing a domain from Cloudflare

As stated in §6.1 of Cloudflare’s [Domain Registration Agreement](https://www.cloudflare.com/domain-registration-agreement/), you must use Cloudflare’s nameservers for your root domain, hence adding it to playit.gg using NS record is not possible. However, if your tunnel utilises playit’s gateway feature, you can add it using a CNAME record, if not, please visit {{< link "external-domain-cloudflare" >}} to learn how to use NS records instead.

This guide will show the steps of adding a subdomain using CNAME record to a gateway in your playit.gg account. In our example our domain is `playit-example.com`, for you this will likely be different.


### Requirements
* [playit premium](https://playit.gg/account/billing/shop/premium)
* You already purchased a domain name on https://domains.cloudflare.com/
* [playit agent](https://playit.gg/download) version `>=0.17.0`
* Only **Minecraft Java Tunnel** or **HTTPs Tunnel** support gateway.

For other Domain Registrars visit {{< link "add-external-domain" >}}.

## 1. Add your domain to playit

Visit your [account settings](https://playit.gg/account/settings/domains) and add your domain.

Click on `Domains`, and then go to `Add External Domain`. Fill out your domain's information.

**DO NOT** add NS records in Cloudfalre, just type your domain and submit.

{{< image src="post-img/playit-addexternaldomain-cloudflare-cname-addexternaldomain.png" alt="playit add external domain" >}}

Once you've done that, confirm your settings by clicking `Add Domain`.

## 2a. Add a gateway to your account

Visit your [account settings](https://playit.gg/account/details/gateways) and add your gateway.

Click on `Add Gateway` to create a new gateway, next step you will be asked to select a region, select the one that is clostest to your server. You can also click on an existing gateway if you would like to add the domain to it.

{{< image src="post-img/playit-addexternaldomain-cloudflare-cname-gateway-add.png" alt="playit add gateway" >}}


## 2b. Add a domain to your gateway

After entering your gateway's setting page, you will see these two sections.

{{< image src="post-img/playit-addexternaldomain-cloudflare-cname-gateway-view1.png" alt="playit view gateway" >}}

In `Assigned Domains` section, click on `+ Add Domain`, select your domain. 

{{< image src="post-img/playit-addexternaldomain-cloudflare-cname-gateway-domain-add.png" alt="playit add gateway" >}}

Domain is successfully added. Now copy the value shown in the `Setup External Domain` section, in this example we are using `3bdc719f0bfce73a.gw.playit-dns.com`, yours will be different.

{{< image src="post-img/playit-addexternaldomain-cloudflare-cname-gateway-view2.png" alt="playit add gateway" >}}

## 3. Visit your domain's management page

Log in to the **Cloudflare Dashboard**, select your domain, and open the **DNS → Records** page.

{{< image src="post-img/playit-addexternaldomain-cloudflare-managedns.png" alt="cloudflare manage dns" >}}

## 4. Add CNAME record for the domain

We will connect your domain to your playit.gg gateway using a **CNAME record**.

Click on `+ Add Record`, create the following **CNAME record**:

| Type | Name (might be different for you) | Target (use the value you just cpoied) | Proxy Status | TTL |
|:-|:-|:-|:-|:-|
| `CNAME` | `playit-example.com` | `3bdc719f0bfce73a.gw.playit-dns.com` | DNS Only | Auto |

{{< image src="post-img/playit-addexternaldomain-cloudflare-cname-add_cname_record.png" alt="cloudflare manage cname add" >}}

It should look like this after adding your CNAME record.

{{< image src="post-img/playit-addexternaldomain-cloudflare-cname-view_cname_record.png" alt="cloudflare manage cname view" >}}

## 5. Assign your gateway during tunnel creation

Create a new **Minecraft Java Tunnel** or **HTTPs Tunnel** tunnel, at the `Public Endpoint` step, click on the `Gateways` tab, select the gateway you have just created, and finish the rest of the setup.

{{< image src="post-img/playit-addexternaldomain-cloudflare-cname-gateway-assign.png" alt="playit assign gateway" >}}

After that, your gateway is assigned to the new tunnel.

## 6. (Optional) Check if the new domain is properly set up

To do this, we can use something like [nslookup.io](https://nslookup.io/).

Enter your domain, and then click **Find DNS records**

{{< image src="post-img/playit-addexternaldomain-cloudflare-cname-check_ns-1.png" alt="check dns records" >}}

Your result might be showing as A and AAAA record instead of CNAME record, click on the result IPs, if you see the name `Developed Methods LLC`, it is working correctly.

{{< image src="post-img/playit-addexternaldomain-cloudflare-cname-check_ns-2.png" alt="check dns records" >}}

---

After adding your domain, it can take up to 1 hour before the update is seen globally. Usually it's much quicker.

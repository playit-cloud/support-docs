+++
title = "Add an external domain with Cloudflare"
tags = ["external-domain"]
description_file = "descriptions/external-domain-cloudflare.txt"
+++

## Before purchasing a domain from Cloudflare

As stated in §6.1 of Cloudflare’s [Domain Registration Agreement](https://www.cloudflare.com/domain-registration-agreement/), you must use Cloudflare’s nameservers for your root domain, hence adding it to playit.gg using NS record is not possible. However, if your tunnel utilises playit’s gateway feature, you can add it using a CNAME record, please visit {{< link "external-domain-cloudflare-cname" >}} for the steps.

This guide will show the steps of adding a subdomain using NS record to your playit.gg account. In our example our domain is `playit-example.com` and the subdomain is `minecraft` so we'll be adding `minecraft.playit-example.com`, for you this will likely be different.


### Requirements
* [playit premium](https://playit.gg/account/billing/shop/premium)
* You already purchased a domain name on https://domains.cloudflare.com/

For other Domain Registrars visit {{< link "add-external-domain" >}}.

## Prefer to watch a video?
{{< youtube id="452zXoAb8nU">}}

## 1. Add your domain to playit

Visit your [account settings](https://playit.gg/account/settings/domains) and add your domain.

Click on `Domains`, and then go to `Add External Domain`. Fill out your domain's information.

{{< image src="post-img/playit-addexternaldomain-cloudflare-addexternaldomain.png" alt="playit add external domain" >}}

Once you've done that, confirm your settings by clicking `Add Domain`.


## 2. Visit your domain's management page

Log in to the **Cloudflare Dashboard**, select your domain, and open the **DNS → Records** page.

{{< image src="post-img/playit-addexternaldomain-cloudflare-managedns.png" alt="cloudflare manage dns" >}}

## 3. Add NS records for the sub domain

We will delegate the sub domain to playit.gg using **NS records**.

Click on `+ Add Record`, create the following **NS records**:

| Type | Name (might be different for you) | Nameserver | TTL |
|:-|:-|:-|:-|
| `NS` | `minecraft` | `ns1.playit-dns.com` | Auto |
| `NS` | `minecraft` | `ns2.playit-dns.com` | Auto |

{{< image src="post-img/playit-addexternaldomain-cloudflare-add_ns_record.png" alt="cloudflare manage ns" >}}

## 4. Assign your domain to a tunnel

Edit or create a new tunnel, and look at the top of the page. You should see an automatically assigned domain. Click on `Change domain`, and choose a domain from `Select a domain from your account`.

{{< image src="post-img/playit-addexternaldomain-cloudflare-assign_to_tunnel-2.png" alt="playit assign domain" >}}

Once you've selected your domain, click on `use yourdomain.tld`. Again, your domain will be different.

## 5. (Optional) Check if the new domain is properly set up

To do this, we can use something like [nslookup.io](https://nslookup.io/).

Enter your domain, and then click **Find DNS records**

{{< image src="post-img/playit-addexternaldomain-cloudflare-check_ns-1.png" alt="check dns records" >}}

{{< image src="post-img/playit-addexternaldomain-cloudflare-check_ns-2.png" alt="check dns records" >}}

---

After adding your sub domain, it can take up to 1 hour before the update is seen globally. Usually it's much quicker.

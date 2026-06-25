+++
title = "Add an external domain with Cloudflare"
tags = ["external-domain"]
description_file = "descriptions/external-domain-cloudflare.txt"
+++

Your root domain cannot be on both Cloudflare and Playit. Because your domain is setup with cloudflare, we will add a subdomain to your Playit account. In our example our domain is `playit-example.com` and the subdomain is `minecraft` so we'll be adding `minecraft.playit-example.com`. For you this will likely be different.


### Requirements
* [playit premium](https://playit.gg/account/billing/shop/premium)
* your external domain setup **Cloudflare DNS**

For other Domain Registrars visit {{< link "add-external-domain" >}}.

## 1. Add your domain to playit

Visit your [account settings](https://playit.gg/account/settings/domains) and add your domain.

Click on `Add External Domain`, and fill out your domain's information.
{{< image src="post-img/playit-addexternaldomain-cloudflare-addexternaldomain.png" alt="playit add external domain" >}}

Once you've done that, confirm your settings by clicking `Add External Domain`.


## 2. Visit your domain's management page

Log in to the **Cloudflare Dashboard**, select your domain, and open the **DNS → Records** page.

{{< image src="post-img/playit-addexternaldomain-cloudflare-managedns.png" alt="cloudflare manage dns" >}}

---

## 3. Add NS records for the sub domain

We will delegate the sub domain to playit.gg using **NS records**.

Create **one NS record**:

### NS Record

* **Type:** `NS`
* **Name:** `minecraft` (might be different for you)
* **Target:** `ns1.playit-dns.com`
* **TTL:** Auto

{{< image src="post-img/playit-addexternaldomain-cloudflare-add_ns_record.png" alt="cloudflare manage ns" >}}

---

## 4. Assign your domain to a tunnel

Edit or create a new tunnel, and scroll down until you see your tunnel attributes. You should see **Domain (Auto Assigned)**. Click on `change`, go to `Use Existing`, and choose your domain from the dropdown menu

{{< image src="post-img/playit-addexternaldomain-cloudflare-assign_to_tunnel-1.png" alt="playit assign domain" >}}

{{< image src="post-img/playit-addexternaldomain-cloudflare-assign_to_tunnel-2.png" alt="playit assign domain" >}}

Once you've selected your domain, click on `use yourdomain.tld`. Again, your domain will be different.

## 5. Check if the new domain is properly set up

To do this, we can use something like [nslookup.io](https://nslookup.io/)
Enter your domain, and then click **Find DNS records**

{{< image src="post-img/playit-addexternaldomain-cloudflare-check_ns-1.png" alt="check dns records" >}}

{{< image src="post-img/playit-addexternaldomain-cloudflare-check_ns-2.png" alt="check dns records" >}}

---

After adding your sub domain, it can take up to 1 hour before the update is seen globally. Usually it's much quicker.

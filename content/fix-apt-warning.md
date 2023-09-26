+++
title = 'Fix apt warning'
tags = ["linux"]
+++

If you've been with playit for awhile you may have installed the playit agent using our old script. The method we used is no longer best practice and you'll likely get a warning about playit whenever you run `apt-get update`.

You can fix this by these commands


```
sudo apt-key del '16AC CC32 BD41 5DCC 6F00  D548 DA6C D75E C283 9680'
sudo rm /etc/apt/sources.list.d/playit-cloud.list
sudo apt update

curl -SsL https://playit-cloud.github.io/ppa/key.gpg | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/playit.gpg >/dev/null
echo "deb [signed-by=/etc/apt/trusted.gpg.d/playit.gpg] https://playit-cloud.github.io/ppa/data ./" | sudo tee /etc/apt/sources.list.d/playit-cloud.list
sudo apt update
```


### The commands explained


```
sudo apt-key del '16AC CC32 BD41 5DCC 6F00  D548 DA6C D75E C283 9680'
```

This comamnd will remove playit's signing key from your general apt repository trust. If a key is in your general apt repository trust, your computer will accept any package signed by us. That's not a good thing so it's good idea to remove our key.

If you want to see the other keys your system has under it's general trust you can run `apt-key list`. The keys under `/etc/apt/trusted.gpg` can sign any package. Ideally you'd only have the key from your OS's default repository.

---

```
sudo rm /etc/apt/sources.list.d/playit-cloud.list
```

This command removes our old details on where you can find our packages. Removing this just makes things easier to have a simple update

---

```
sudo apt update
```

This updates your repository index and gives us a clean slate to add back our repository using a better method

---

```
curl -SsL https://playit-cloud.github.io/ppa/key.gpg | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/playit.gpg >/dev/null
```

This downloads the key we use to sign our packages and adds it to a new file we'll reference later.

---

```
echo "deb [signed-by=/etc/apt/trusted.gpg.d/playit.gpg] https://playit-cloud.github.io/ppa/data ./" | sudo tee /etc/apt/sources.list.d/playit-cloud.list
```

This command tells your computer where to find our packages and what key they must be signed with for authentication. We downloaded the key in the previous command.


hugo

WEB_HOST=$1

# copy dependencies first to avoid breaking website
rsync -arv -e ssh --exclude="**/*.html" public/* "root@$WEB_HOST:/var/www/playit/support"
rsync -arv -e ssh public/* "root@$WEB_HOST:/var/www/playit/support"

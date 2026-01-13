npm run build

WEB_HOST=$1

# copy dependencies first to avoid breaking website
rsync -arv -e ssh --exclude="**/*.html" build/* "root@$WEB_HOST:/var/www/playit/support"
rsync -arv -e ssh build/* "root@$WEB_HOST:/var/www/playit/support"

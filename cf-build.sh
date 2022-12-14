hugo

rm -rf out
mkdir out

echo "
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv=\"refresh\" content=\"7; url='/support'\" />
    <script>window.location = '/support';</script>
  </head>
  <body>
    <p>Please follow <a href=\"/support\">this link</a>.</p>
  </body>
</html>
" > out/index.html

mv public out/support


## Slider Web App for Omar A.

### This is a Node App. Which means the entry point is through server.js.

### To setup dependencies Run the following first:

1. npm install

### Then run:

2. node server.js

### Node is configured to run on port 3000. So after server starts

### just go here:

3. http://localhost:3000

## Some configuration steps:

I have used array of arrays. The left and right buttons work the same as before.
Even after going previous or next, the app retains the duration till which the picture is shown
and then automatically switches to the next picture.

Your map of pictures say in server.js line 10 to 16. You can keep adding to it however you want.
Whenever calendar is called, it fetches the website and shows it in iFrame.
To change `YOUR_WEBSITE_LINK` go to main.js line 36. Any website there would be fetched and shown.

Also, put the images on the images folder in the project dir.

NOTE: After making any changes like changing website name or adding images to display array,
make sure you stop the node server (CTRL+C) and then do step 2. again and reload page.

//==============================================================================================================

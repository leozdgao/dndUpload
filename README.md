# dndUpload
Drag, drop and upload

### Description

Use HTML5 drag and drop API, XMLHttpRequest 2.0, Compatibility: IE10+.

There is a server which implemented by node.js, which use `node-static` and `formidable` to handle the site.

Here is a snapshot:

![Demo](http://7sbm5t.com1.z0.glb.clouddn.com/dnd_upload.png)

Drag the file or files to the box, and drop, thery will be upload!

### Installation

You need to install `node.js` first and use this command:

```
npm install
```

Then configurate the uploading destination folder in the `server/config.json` with key `upload_dir`.

After that, you need to build the assets by gulp task:

```
gulp release
```

You can start the app by: 

```
npm start
```

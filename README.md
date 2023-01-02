# aws-node-express-app

An express web app calling AWS services from backend after uploading file from browser/UI

# image background

<a href="https://www.freepik.com/free-vector/blue-curve-frame-template_16326538.htm#query=blue%20background&position=1&from_view=search&track=sph">Image by rawpixel.com</a> on Freepik

# server start(refer /config for configurable env)

```
NODE_ENV=<env> npm start
```

# index url

> localhost:3000/index

# basic info about the web app

- csv files < 50MB can only be uploaded using multer -> S3 upload
- using AWS default credentials either in profile or IAM role
- env settings in config directory, for local change local_sample.js to local.js

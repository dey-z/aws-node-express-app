# aws-node-express-app

An [express](https://expressjs.com/) web app calling AWS services from backend after uploading file from browser/UI
<img width="1440" alt="Screen Shot 2023-01-02 at 16 09 43" src="https://user-images.githubusercontent.com/48423778/210202794-df0ea111-a880-4656-a9e3-a19200f5a040.png">


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
- env settings in config directory, for local change **/config/local_sample.js** to **/config/local.js**
- used [Express generator](https://expressjs.com/en/starter/generator.html) for the project

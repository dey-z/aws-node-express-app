# aws-node-express-uploader

An [express](https://expressjs.com/) web app calling AWS services from backend after uploading file from browser/UI

# image background

<a href="https://www.freepik.com/free-vector/blue-curve-background_16282280.htm#fromView=image_search_similar&page=1&position=22&uuid=b7ed21cd-8b9b-4f13-ad5a-497a79bd1f85">Image by rawpixel.com</a> on Freepik

# install libraries

```
npm ci
```

# server start(refer /config for configurable env, copy local_sample.js to local.js)

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

# wiki

> check web app design

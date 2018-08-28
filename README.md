# ♨️ serverless-react-boilerplate

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![dependencies](https://img.shields.io/david/arabold/serverless-react-boilerplate.svg)](https://github.com/arabold/serverless-react-boilerplate)


Lightweight boilerplate project to setup a React 16 web application on AWS Lambda using the Serverless Framework.

## Key Features

* Universal app; server-side rendering with dynamic configuration context passed from backend to browser.
* Self-contained; no additional setup steps necessary other than running `npx sls deploy`.
* Lightweight; no mandatory `redux`, `react-router`, `sass`, `less` or any other 3rd party dependency for full flexibility.
* Full ES6/7 support using Babel 7 and Webpack 4.
* Working [Jest](https://jestjs.io/) test environment.


## Overview

### Folder Structure
```
serverless-react-boilerplate/
│
├── public/ - Public assets such as images
│   ├── favicon.ico - Favicon
│   └── manifest.json - Web page manifest
│
├── src/
│   ├── client/
│   │   └── ... - Client-side code
│   ├── components/
│   │   └── ... - React components
│   └── server/
│       └── ... - Server-side code
│
├── handler.js - AWS Lambda function handler
├── serverless.yaml - Project configuration
├── webpack.client.config.js - Webpack configuration for client-side code
├── webpack.server.config.js - Webpack configuration for the Lambda backend
└── ...
```

### Serverless
The project is based on the [Serverless Framework](https://serverless.com)
and makes use of a number of plugins:

* Webpack Plugin - We use Webpack for packaging our sources.
* Offline Plugin - The Serverless Offline Plugin allows you to run Serverless
  applications locally as if they would be deployed on AWS. This is especially
  helpful for testing web applications and APIs without having to deploy them
  anywhere.
* Export Env Plugin - The Export Env Plugin reads our AW setup and 
  automatically injects all dynamic values as environment variables in our
  code.


### Webpack
Though we use the same source code for both the server-side and client-side 
rendering, the project will be packaged into two distinct bundles:

1. Backend code running on AWS Lambda. The main entry point is 
  `./src/server/index.js`. The packaging is controlled by 
  `webpack.server.config.js` and optimized for Node.js 8.10.
2. Frontend code hosted in an S3 bucket and loaded by the browser. Main entry
  point is `./src/client/index.js`. It's packaged using the
  `webpack.client.config.js`, optimized for web browsers. The output files
  will have their content hash added to their names to enable long term
  caching in the browser.


## Customization

### Serverless Project
Update the `serverless.yaml` with your project name and additional resources
you might need.

### Adding a backend API
I would recommend to create a separate Serverless service that provides
the frontend with an API and protect it via Cognito, a custom Authorizer
or even just an API Key. Mixing React with pure backend API functions is
possible and perfectly fine, but in my experience it quickly becomes a
hassle and you need to take special care not to leak anything to the
browser that's not supposed to be known there.

### Redux, React-Router, etc.
The goal of this boilerplate is to offer a minimal setup that can be used as
a basis for pretty much all your React needs. A lot of people love Redux,
rely on React-Router or need other external modules. I have intentionally left
these out of the boilerplate code but it should be trivial to add them,
following the standard documentation steps.

### Sass, Styled Components, etc.
Similar to the statement above, I have decided against integrating with a
specific framework. The boilerplate uses plain and simple CSS and integrating
another system should be easy enough.

### Flow and Typescript
Personally I love Flow but have decided against using it in this project 
for now. There's not much JavaScript code in here anyway so you can use in
your own project whatever you prefer.


## Testing

You can test the setup locally. However, due to the nature of this setup you
will need to deploy the stack at least once to get everything prepared 
properly for local execution. Once the stack is deployed, no  access to AWS 
is needed other than read-only to the stack itself as well as its dependencies.
This allows developers to write and test code even if not everyone has 
full deployment access.

The whole application can be deployed with a single command:
```sh
npx sls deploy
```

For local testing run the following command and open your web browser 
at http://localhost:3000:
```sh
npm start
```

Testing is also setup using Jest and will execute all `*.test.js` files in 
the `src/` directory:
```sh
npm test
```

And finally to remove all AWS resources again run:
```sh
npx sls remove
```

This will delete all resources but the distribution S3 bucket. As it
still contains the bundles you will have to delete it manually for
now.

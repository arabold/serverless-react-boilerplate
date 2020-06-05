# ♨️ serverless-react-boilerplate

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![dependencies](https://img.shields.io/david/arabold/serverless-react-boilerplate.svg)](https://github.com/arabold/serverless-react-boilerplate)

Lightweight boilerplate project to setup a React 16 web application on AWS Lambda using the Serverless Framework.

## Key Features

- Universal app; server-side rendering with dynamic configuration context passed from backend to browser.
- Self-contained; no additional setup steps necessary other than running `npx sls deploy`.
- Lightweight; no mandatory `redux`, `react-router`, `sass`, `less` or any other 3rd party dependency for full flexibility.
- Full ES6/7/8/9/10 with latest JavaScript features supported using Babel 7 and Webpack 4.
- Working [Jest](https://jestjs.io/) test environment.

[Looking for the TypeScript version of this boilerplate?](https://github.com/arabold/serverless-react-boilerplate/tree/typescript)

## Overview

### How Does It Work?

The idea is that we use AWS Lambda to serve the dynamic part of our app, the server-side logic, and perform the server-side rendering. For all static data like images, stylesheets and even the app's `index.jsx` that is loaded in the browser, we use an S3 bucket for public hosting.

This combination makes our app fast and incredibly scalable. AWS will spin up new Lambda instances once your number of users increases, handling even the largest spikes fully automatically, while incurring virtually no costs when your app isn't used. At the same time S3 provides a robust and fast platform for your static content so you don't have to waste your own computing resources.

All resources, including the S3 bucket for hosting static content, are created and configured automatically when your app is deployed the first time. You can make changes to the default setup by updating your `serverless.yml` to your linking.

### Folder Structure

```
serverless-react-boilerplate/
│
├── public/ - Public assets such as images
│   ├── favicon.ico - Favicon
│   └── manifest.json - Web page manifest
│
├── src/
│   ├── browser/
│   │   └── ... - Client-side code running in the browser as well as during server-side rendering
│   ├── components/
│   │   └── ... - React components
│   └── server/
│       └── ... - Server-side code running on AWS Lambda
│
├── handler.js - AWS Lambda function handler
├── serverless.yaml - Project configuration
├── webpack.browser.config.js - Webpack configuration for client-side code
├── webpack.server.config.js - Webpack configuration for the Lambda backend
└── ...
```

### Serverless

The project is based on the [Serverless Framework](https://serverless.com) and makes use of a number of plugins:

- [Webpack Plugin](https://github.com/serverless-heaven/serverless-webpack) - We use Webpack for packaging our sources.
- [Offline Plugin](https://github.com/dherault/serverless-offline) - The Serverless Offline Plugin allows you to run Serverless applications locally as if they would be deployed on AWS. This is especially helpful for testing web applications and APIs without having to deploy them anywhere.
- [Export Env Plugin](https://github.com/arabold/serverless-export-env) - The Export Env Plugin reads our AW setup and automatically injects all dynamic values as environment variables in our code.
- [Scripts Plugin](https://github.com/mvila/serverless-plugin-scripts#readme) - Run shell scripts as part of your Serverless workflow
- [S3 Deploy Plugin](https://github.com/funkybob/serverless-s3-deploy) - Deploy files to S3 buckets. This is used for uploading static content like images and the generated `index.js`.

### Webpack

Though we use the same source code for both the server-side and browser rendering, the project will be packaged into two distinct bundles:

1. Backend code running on AWS Lambda. The main entry point is `./src/server/index.jsx`. The packaging is controlled by `webpack.server.config.js` and optimized for Node.js 12.
2. Frontend code hosted in an S3 bucket and loaded by the browser. Main entry point is `./src/browser/index.jsx`. It's packaged using the `webpack.browser.config.js`, optimized for web browsers. The output files will have their content hash added to their names to enable long term caching in the browser.

## Customization

### Serverless Project

Update the `serverless.yaml` with your project name and additional resources you might need.

### Configuration

The frontend as well as the server-side code running on AWS Lambda share a common application configuration. Currently it is used for injecting the application name from the `public/manifest.json` as well as setting the public host names. You can extend the configuration by adding your own variables to `src/server/config.jsx`. They will become available in both your backend and frontend code via the `useConfig` hook:

```js
import useConfig from "../components/useConfig";

export default function MyComponent() {
  const config = useConfig();
  return (
    // ...
  )
}
```

### Adding a backend API

I would recommend to create a separate Serverless service that provides the frontend with an API and protect it via [Amazon Cognito](https://aws.amazon.com/cognito/), a custom Authorizer or even just an API Key. Mixing React with pure backend API functions is possible and perfectly fine, but in my experience it quickly becomes a hassle and you need to take special care not to leak anything to the browser that's not supposed to be known there.

### Redux, React-Router, etc.

The goal of this boilerplate is to offer a minimal setup that can be used as a basis for pretty much all your React needs. A lot of people love [Redux](https://redux.js.org/), rely on [React-Router](https://reacttraining.com/react-router/) or need other external modules. I have intentionally left these out of the boilerplate code but it should be trivial to add them, following the standard documentation steps.

### Sass, Styled Components, etc.

Similar to the statement above, I have decided against integrating with a specific framework. The boilerplate uses plain and simple CSS and integrating another system should be easy enough.

### Flow and TypeScript

This project constist of very little JavaScript and porting it to Flow or TypeScript is relatively straight forward. However, as pretty much all my own projects are written in TypeScript I'm providing a separate [TypeScript branch](https://github.com/arabold/serverless-react-boilerplate/tree/typescript). It contains everything necessary to run a TypeScript based React application.

## Testing

You can test the setup locally. However, due to the nature of this setup you will need to deploy the stack at least once to get everything prepared properly for local execution. Once the stack is deployed, no access to AWS is needed other than read-only to the stack itself as well as its dependencies. This allows developers to write and test code even if not everyone has full deployment access.

The whole application can be deployed with a single command:

```sh
npx sls deploy
```

For local testing run the following command and open your web browser at http://localhost:3000. Static content such as images will be served via the [Webpack DevServer](https://webpack.js.org/configuration/dev-server/) running on http://localhost:8080. Note that the app has to be deployed first before you will be able to run locally.

```sh
npm start
```

Testing is set up as well, using Jest and will execute all `*.test.js` files in the `src/` directory:

```sh
npm test
```

And finally to remove all AWS resources again run:

```sh
npx sls remove
```

This will delete all resources but the distribution S3 bucket. As it still contains the bundles you will have to delete it manually for now.

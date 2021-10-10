# ♨️ serverless-react-boilerplate

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![dependencies](https://img.shields.io/david/arabold/serverless-react-boilerplate.svg)](https://github.com/arabold/serverless-react-boilerplate)

Lightweight boilerplate project to set up a React 17 web application on AWS Lambda using the Serverless Framework.

## Key Features

- Universal app; server-side rendering with dynamic configuration context passed from backend to browser.
- Self-contained; no additional setup steps necessary other than running `npx sls deploy`.
- Lightweight; no mandatory `redux`, `react-router`, `sass`, `less` or any other 3rd party dependency for full flexibility.
- React "Fast Refresh" (previously known as "Hot Reloading") using the [React Refresh Webpack Plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin).
- Built-in support for [code splitting](https://webpack.js.org/guides/code-splitting/) and [tree shaking](https://webpack.js.org/guides/tree-shaking/) to optimize page loading times.
- Full [TypeScript](https://www.typescriptlang.org/) support using Babel 7 and Webpack 5, including custom [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html).
- Working [Jest](https://jestjs.io/) test environment.

[Looking for the plain JavaScript version of this boilerplate?](https://github.com/arabold/serverless-react-boilerplate/)

## Overview

### How Does It Work?

The idea is that we use AWS Lambda to serve the dynamic part of our app, the server-side logic, and perform the server-side rendering. For all static data like images, stylesheets, and even the app's `index.tsx` that is loaded in the browser, we use an S3 bucket for public hosting.

This combination makes our app fast and incredibly scalable. AWS will spin up new Lambda instances once your number of users increases, handling even the largest spikes fully automatically while incurring virtually no costs when your app isn't used. At the same time, S3 provides a robust and fast platform for your static content so you don't have to waste your own computing resources.

All resources, including the S3 bucket for hosting static content, are created and configured automatically when your app is deployed the first time. You can make changes to the default setup by updating your `serverless.yml` to your linking.

### Folder Structure

```
serverless-react-boilerplate/
│
├── public/ - Public assets which will retain their original file names and folder structure
│   ├── favicon.ico - Favicon
│   └── manifest.json - Web page manifest
│
├── src/
│   ├── browser/
│   │   └── ... - Client-side code running in the browser as well as during server-side rendering
│   ├── components/
│   │   └── ... - React components
│   ├── server/
│   │   └── ... - Server-side code running on AWS Lambda
│   ├── App.tsx - The web application's root component.
│   └── ... - Other files used by the application
│
├── handler.ts - AWS Lambda function handler
├── serverless.yml - Project configuration
├── babel.config.js - Babel configuration
├── jest.config.js - Jest configuration
├── webpack.browser.config.js - Webpack configuration for client-side code
├── webpack.server.config.js - Webpack configuration for the Lambda backend
└── ...
```

### Serverless

The project is based on the [Serverless Framework](https://serverless.com) and makes use of several plugins:

- [Webpack Plugin](https://github.com/serverless-heaven/serverless-webpack) - We use Webpack for packaging our sources.
- [Offline Plugin](https://github.com/dherault/serverless-offline) - The Serverless Offline Plugin allows you to run Serverless applications locally as if they would be deployed on AWS. This is especially helpful for testing web applications and APIs without having to deploy them anywhere.
- [Scripts Plugin](https://github.com/mvila/serverless-plugin-scripts#readme) - Run shell scripts as part of your Serverless workflow
- [S3 Deploy Plugin](https://github.com/funkybob/serverless-s3-deploy) - Deploy files to S3 buckets. This is used for uploading static content like images and the generated `main.js`.

### Webpack

Though we use the same source code for both the server-side and browser rendering, the project will be packaged into two distinct bundles:

1. Backend code running on AWS Lambda. The main entry point is `./src/server/render.tsx`. It contains the handler function that is invoked by AWS Lambda. The packaging is controlled by `webpack.server.config.js` and optimized for Node.js 12.
2. Frontend code hosted in an S3 bucket and loaded by the browser. Main entry point is `./src/browser/index.tsx`. It's packaged using the `webpack.browser.config.js`, optimized for web browsers. The output files will have their content hash added to their names to enable long-term caching in the browser.

#### Code Splitting

`webpack.browser.config.js` defines some default code-splitting settings that optimize browser loading times and should make sense for most projects:

- Shared components (in the `src/components` folder) are loaded in a separate `components.js` chunk.
- All external Node modules (in the `node_modules/` folder) are loaded in the `vendor.js` chunk. External modules usually don't change as often as the rest of your application and this split will improve browser caching for your users.
- The rest of the application is loaded in the `main.js` chunk.

## Customization

### Serverless Project

Update the `serverless.yml` with your project name and additional resources you might need. For example, you might want to [create a custom domain name for your app](https://www.serverless.com/plugins/serverless-domain-manager).

### Configuration

The frontend, as well as the server-side code running on AWS Lambda, share a common application configuration. Currently, it is used for injecting the application name from the `public/manifest.json` as well as setting the public hostnames. You can extend the configuration by adding your own variables to `src/server/config.tsx`. They will become available in both your backend and frontend code via the `useConfig` hook:

```js
import useConfig from "../components/useConfig";

export default function MyComponent() {
  const config = useConfig();
  return (
    // ...
  )
}
```

### Adding Your Own Code

The boilerplate comes with a preferred folder structure for your project. However, you can change it to your liking. If you decide to do so, make sure to update the respective Webpack and Serverless configurations to point to the new locations.

Generally, you shouldn't need to touch the contents of the `src/browser/` and `src/server/` folders, with exception of updating the configuration. Common components shared across your React site should go into the `src/components/` folder. It currently contains only the `ConfigContext` provider and the `useConfig` hook implementation. Code splitting has already been configured to package these shared components separately from the rest of your application. You might want to place individual web pages or screens of your application into subfolders directly underneath `src/` or next to `App.tsx`.

Images can be loaded directly from the `src/` folder as demonstrated in `App.tsx`. Webpack will automatically manage your images, ensure they use a unique file name and are loaded either from S3 or get embedded directly into the generated HTML if they are small enough. The `public/` folder on the other hand is used for static assets that should retain their original file names and folder structure. All content of this folder will be uploaded to S3 exactly 1:1 and served from there. It is the perfect place to put your `favicon.ico`, `robots.txt`, and similar static assets that you need to reference by a fixed unchanging URL.

### Adding a backend API

I recommend creating a _separate_ Serverless service that provides the frontend with an API and protecting it with [Amazon Cognito](https://aws.amazon.com/cognito/), a custom Authorizer, or even just an API Key. Mixing React with pure backend API functions is possible and technically fine, but in my experience, it quickly becomes a hassle and you need to take special care not to leak anything to the browser that's not supposed to be known there.

### Redux, React-Router, etc.

The goal of this boilerplate is to offer a minimal setup that can be used as a basis for pretty much all your React needs. A lot of people love [Redux](https://redux.js.org/), rely on [React Router](https://reactrouter.com/) or need other external modules. I have intentionally left these out of the boilerplate code but it should be trivial to add them, following the standard documentation steps.

If you are interested in integrating with [React Router](https://reactrouter.com/), check out out the [Added React Router example configuration](https://github.com/arabold/serverless-react-boilerplate/pull/16/files) Pull Request.

### Sass, Styled Components, etc.

Similar to the statement above, I have decided against integrating with a specific framework. The boilerplate uses plain and simple CSS and integrating another system should be easy enough.

### Code Formatting & Adding ESLint

To keep this repository lightweight no ESLint rules are included. There are many different plugins and people tend to prefer different coding styles. The existing code should be easily adaptable to any style you personally prefer. I recommend using [Prettier](https://prettier.io/) to format your code automatically and a default configuration is already part of this repository, defined in `package.json`. In addition, I recommend adding [ESLint](https://eslint.org/) and [Husky](https://github.com/typicode/husky) to your project to ensure your coding guidelines are followed.

## Testing

You can test the setup locally. No direct access to AWS is needed. This allows developers to write and test code even if not everyone has full deployment access.

For local testing run the following command and open your web browser at http://localhost:3000/. Static content such as images will be served via the [Webpack DevServer](https://webpack.js.org/configuration/dev-server/) running on http://localhost:8080. Note that the app has to be deployed first before you will be able to run locally.

```sh
npm start
```

Testing is set up as well, using Jest and will execute all `*.test.ts` and `*.test.tsx` files in the `src/` directory:

```sh
npm test
```

The whole application can be deployed with a single command:

```sh
npx sls deploy
```

And finally to remove all AWS resources again run:

```sh
npx sls remove
```

This will delete all resources but the distribution S3 bucket. As it still contains the bundles you will have to delete the bucket manually for now.

## Changelog

### 2021-10-10

- Updated dependencies to the latest versions. This includes specifically the Webpack Dev Server 4.x.
- Restructured the project structure to be more consistent. `App.tsx` and related files have been moved out for the `browser` folder directly into `src` as it is used by both the server and the browser rendering. You should rarely need to touch the contents of the `browser` or the `server` folder.
- Updated the documentation (this file you're currently reading)

### 2021-06-04

- Updated to React 17
- React "Fast Refresh" (previously known as "Hot Reloading") using the [React Refresh Webpack Plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin).
- Built-in support for [code splitting](https://webpack.js.org/guides/code-splitting/) and [tree shaking](https://webpack.js.org/guides/tree-shaking/) to optimize page loading times.
- Full [TypeScript](https://www.typescriptlang.org/) support using Babel 7 and Webpack 5, including custom [module resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html).
- Handle server-side errors more gracefully. Update `handler.ts` to add your own custom error handling code such as [Youch](https://github.com/poppinss/youch).
- Code cleanup and simplification

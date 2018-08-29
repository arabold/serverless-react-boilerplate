/**
 * Configuration
 */
import Manifest from '../../public/manifest.json';

/** Whether we're running on a local desktop or on AWS Lambda */
const isLocal = process.env.IS_LOCAL || process.env.IS_OFFLINE;

/**
 * Configuration Options
 * 
 * IMPORTANT:
 * The config is injected into the client (browser) and accessible through the {@link ConfigConsumer}
 * component. However, due to this behavior, it is important NOT to expose any sensitive information
 * such as passwords or tokens through the config.
 */
export const config = {
  /** Application Config */
  app: {
    /** Name of the app is loaded from the `manifest.json` */
    TITLE: Manifest.short_name,
    /** Theme is also loaded from the `manifest.json` */
    THEME_COLOR: Manifest.theme_color,
    /** URL to our public API Gateway endpoint */
    URL: isLocal ? 'http://localhost:3000' : process.env.APIGATEWAY_URL,
    /** Where the bundled distribution files (`index.js`, `index.css`) are hosted */
    DIST_URL: isLocal ? 'http://localhost:8080' : process.env.APP_DIST_URL,
    /** Where the contents of the `public` folder are hosted (might be the same as `config.app.DIST_URL`) */
    PUBLIC_URL: isLocal ? 'http://localhost:8080' : process.env.APP_PUBLIC_URL,
  },
  cognito: {
    REGION: process.env.SERVERLESS_REGION,
    USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
    USER_POOL_CLIENT_ID: process.env.COGNITO_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.COGNITO_IDENTITY_POOL_ID,
  }
};

export default config;

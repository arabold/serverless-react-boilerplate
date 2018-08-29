/**
 * Server Side Rendering
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import ConfigProvider from '../components/ConfigProvider';
import { configureAmplify } from '../shared/configureAmplify';
import App from '../client/App';
import Html from './Html';
import config from './config';

/** Whether we're running on a local desktop or on AWS Lambda */
const isLocal = process.env.IS_LOCAL || process.env.IS_OFFLINE;

configureAmplify(config);

export async function render() {
  let stats = { main: "index.js", css: "index.css" };
  if (!isLocal) {
    try {
      stats = require("../../dist/stats.json");
    }
    catch (err) {
      throw new Error("`stats.json` not found");
    }
  }

  const content = renderToString(
    <ConfigProvider value={ config } >
       <App />
    </ConfigProvider>
  );
  return Html({ stats, content, config });
}

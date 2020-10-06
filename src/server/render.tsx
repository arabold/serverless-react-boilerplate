/**
 * Server Side Rendering
 */
import React from "react";
import { renderToString } from "react-dom/server";

import App from "../browser/App";
import ConfigContext from "../components/ConfigContext";
import config from "./config";
import html from "./html";
import { Stats } from "./types";

/** Whether we're running on a local desktop or on AWS Lambda */
const isLocal = process.env.IS_LOCAL || process.env.IS_OFFLINE;

/**
 * Server-side rendering
 */
export default async function render(): Promise<string> {
  let stats: Stats = { main: "index.js", css: "index.css" };
  if (!isLocal) {
    try {
      stats = require("../../dist/stats.json") as Stats;
    } catch (err) {
      throw new Error("`stats.json` not found");
    }
  }

  const content = renderToString(
    <ConfigContext.Provider value={config}>
      <App />
    </ConfigContext.Provider>,
  );
  return html({ stats, content, config });
}

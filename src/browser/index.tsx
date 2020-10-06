import "./index.css";

/**
 * Frontend code running in browser
 */
import React from "react";
import { hydrate } from "react-dom";

import ConfigContext from "../components/ConfigContext";
import { Config } from "../server/config";
import App from "./App";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const config = (window as any).__CONFIG__ as Config;
delete (window as any).__CONFIG__;
/* eslint-enable @typescript-eslint/no-unsafe-member-access */

hydrate(
  <ConfigContext.Provider value={config}>
    <App />
  </ConfigContext.Provider>,
  document.querySelector("#root"),
);

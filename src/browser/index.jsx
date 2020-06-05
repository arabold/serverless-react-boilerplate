/**
 * Client
 */
import React from "react";
import { hydrate } from "react-dom";

import ConfigContext from "../components/ConfigContext";
import App from "./App";

import "./index.css";

const config = window.__CONFIG__;
delete window.__CONFIG__;

hydrate(
  <ConfigContext.Provider value={config}>
    <App />
  </ConfigContext.Provider>,
  document.querySelector("#root"),
);

import React from "react";

import useConfig from "../components/useConfig";
import logo from "./logo.svg";
import "./App.css";

export default function App() {
  const config = useConfig();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to {config.app.TITLE}</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.jsx</code> and save to reload.
      </p>
    </div>
  );
}

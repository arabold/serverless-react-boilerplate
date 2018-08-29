import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react';

import logo from './logo.svg';
import { ConfigConsumer } from '../components/ConfigProvider';
import './App.css';

class App extends Component {
  render() {
    return (
      <ConfigConsumer>
        { config => (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to {config.app.TITLE}</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
        )}
      </ConfigConsumer>
    );
  }
}

export default withAuthenticator(App);

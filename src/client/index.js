/**
 * Client
 */
import React from 'react';
import { hydrate } from 'react-dom';
import ConfigProvider from '../components/ConfigProvider';
import { configureAmplify } from '../shared/configureAmplify';
import App from './App';

import './index.css';

const config = window.__CONFIG__;
delete window.__CONFIG__;

configureAmplify(config);

hydrate(
  <ConfigProvider value={ config } >
     <App />
  </ConfigProvider>,
  document.querySelector('#root')
)

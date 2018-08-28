/**
 * Provide configuration settings
 */
import React from 'react';

export const ConfigContext = React.createContext('config');
export const ConfigProvider = ConfigContext.Provider;
export const ConfigConsumer = ConfigContext.Consumer;

export default ConfigProvider;

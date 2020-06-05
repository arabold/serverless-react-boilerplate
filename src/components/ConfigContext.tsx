/**
 * Provide configuration settings
 */
import React from "react";

import { Config } from "../server/config";

const ConfigContext = React.createContext<Config | undefined>(undefined);

export default ConfigContext;

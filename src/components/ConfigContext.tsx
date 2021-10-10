/**
 * Provide configuration settings
 */
import { createContext } from "react";

import { Config } from "../server/config";

const ConfigContext = createContext<Config | undefined>(undefined);

export default ConfigContext;

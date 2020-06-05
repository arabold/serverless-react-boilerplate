import { useContext } from "react";

import ConfigContext from "./ConfigContext";
import { Config } from "../server/config";

/**
 * Hook to read application configuration settings
 */
export default function useConfig(): Config {
  const config = useContext(ConfigContext);
  if (!config) {
    throw new Error("Configuration context not initialized!");
  }
  return config;
}

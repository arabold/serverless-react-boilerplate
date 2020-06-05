import { useContext } from "react";

import ConfigContext from "./ConfigContext";

/**
 * Hook to read application configuration settings
 */
export default function useConfig() {
  return useContext(ConfigContext);
}

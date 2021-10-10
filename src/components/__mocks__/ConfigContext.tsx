import { createContext } from "react";

import manifest from "../../../public/manifest.json";
import { Config } from "../../server/config";

const ConfigContext = createContext<Config>({
  app: {
    TITLE: `${manifest.short_name} Mock`,
    THEME_COLOR: manifest.theme_color,
    URL: "http://localhost:3000",
    DIST_URL: "http://localhost:8080",
    PUBLIC_URL: "http://localhost:8080",
  },
});

export default ConfigContext;

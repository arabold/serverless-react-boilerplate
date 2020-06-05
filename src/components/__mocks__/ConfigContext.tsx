import React from "react";

import Manifest from "../../../public/manifest.json";
import { Config } from "../../server/config";

const ConfigContext = React.createContext<Config>({
  app: {
    TITLE: `${Manifest.short_name} Mock`,
    THEME_COLOR: Manifest.theme_color,
    URL: "http://localhost:3000",
    DIST_URL: "http://localhost:8080",
    PUBLIC_URL: "http://localhost:8080",
  },
});

export default ConfigContext;

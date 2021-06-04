module.exports = {
  testEnvironment: "jsdom", // need access to DOM
  collectCoverageFrom: ["./src/**/*.{tsx,ts}"],
  // TODO: Add custom setup file - setupFiles: ['./setupJest.js'],
  // TODO: Add JEST extended library - setupFilesAfterEnv: ["jest-extended"],
  moduleNameMapper: {
    // Mock static files
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.ts",
    "\\.(css|less|sass)$": "identity-obj-proxy",
    // Load `tsconfig.json` path mapping
    ...require("jest-module-name-mapper").default(),
  },
};

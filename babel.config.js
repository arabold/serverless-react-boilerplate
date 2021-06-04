module.exports = (api) => {
  // caller.target will be the same as the target option from webpack
  const isNode = api.caller((caller) => caller && caller.target === "node");
  const isOffline = process.env.IS_OFFLINE;
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "entry",
          corejs: "3.9",
          targets: isNode ? { node: "12" } : { browsers: "last 2 versions" },
        },
      ],
      "@babel/preset-typescript",
      "@babel/preset-react",
    ],
    plugins: [
      !isNode && isOffline && "react-refresh/babel",
      // TODO: Add your own Babel plugins here
    ].filter(Boolean),
  };
};

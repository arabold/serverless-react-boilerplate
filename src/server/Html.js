/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */

export const Html = ({ stats, content, config }) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="${config.app.THEME_COLOR}">
    <title>${config.app.TITLE}</title>
    <link rel="manifest" href="${config.app.PUBLIC_URL}/manifest.json">
    <link rel="shortcut icon" href="${config.app.PUBLIC_URL}/favicon.ico">
    <link rel="stylesheet" href="${config.app.DIST_URL}/${stats.css}" >
    <script>window.__CONFIG__ = ${JSON.stringify(config)}</script>
  </head>
  <body>
    <div id="root">${content}</div>
    <script src="${config.app.DIST_URL}/${stats.main}"></script>
  </body>
</html>
`;

export default Html;

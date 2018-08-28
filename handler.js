import 'source-map-support/register';
import { render } from './src/server';

export const serve = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: await render(),
  };
};

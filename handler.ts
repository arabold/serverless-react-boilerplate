import "source-map-support/register";
import render from "./src/server/render";
import { Context, APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";

export const serve = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResultV2> => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
    },
    body: await render(),
  };
};

import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

export type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

// const headers = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
//   'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
//   'Content-Type': 'application/json',
// };

const headers = {
  'Access-Control-Allow-Origin': '*'
};

export const formatJSONResponseNamed = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(response)
  };
}

export const formatJSONResponse = (response: object | string) => {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(response)
  };
}

export const formatResponse = (response: string) => {
  return {
    statusCode: 200,
    headers,
    body: response
  };
}

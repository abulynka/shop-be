import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

export type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

const headers = {
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export const formatJSONResponseNamed = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(response)
  };
}

export const formatJSONResponse = (response: object) => {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(response)
  };
}

export const formatJSONResponseNotFound = (response: Record<string, unknown>) => {
  return {
    statusCode: 404,
    headers,
    body: JSON.stringify(response)
  };
}

export const formatJSONResponseBadRequest = (response: any) => {
  return {
    statusCode: 404,
    headers,
    body: JSON.stringify(response)
  };
}

export const formatJSONResponseInternalServerError = () => {
  return {
    statusCode: 500,
    headers,
    body: JSON.stringify('Internal Server Error')
  };
}

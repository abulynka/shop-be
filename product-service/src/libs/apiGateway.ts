import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

export type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponseNamed = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(response)
  }
}

export const formatJSONResponse = (response: object) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(response)
  }
}

export const formatJSONResponseNotFound = (response: Record<string, unknown>) => {
  return {
    statusCode: 404,
    headers: {
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(response)
  }
}

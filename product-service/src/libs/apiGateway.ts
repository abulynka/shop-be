import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponseNamed = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const formatJSONResponse = (response: object) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const formatJSONResponseNotFound = (response: Record<string, unknown>) => {
  return {
    statusCode: 404,
    body: JSON.stringify(response)
  }
}

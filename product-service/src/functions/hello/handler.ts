import 'source-map-support/register';

import type { ValidatedAPIGatewayProxyEvent, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponseNamed } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import Logger from '@libs/log/logger';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: ValidatedAPIGatewayProxyEvent<string>) => {
  await new Logger().logEvent(event);

  return formatJSONResponseNamed({
    message: `Hello ${event.body['name']}, welcome to the exciting Serverless world!`,
    event,
  });
}

export const main = middyfy(hello);

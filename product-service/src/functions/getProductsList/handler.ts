import 'source-map-support/register';

import type { ValidatedAPIGatewayProxyEvent, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { Products } from '@libs/models/Products';
import Logger from '@libs/log/logger';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: ValidatedAPIGatewayProxyEvent<string>) => {
  await new Logger().logEvent(event);

  const jsonResponse = formatJSONResponse(
    await new Products()
      .getProducts()
  );

  await new Logger().log(jsonResponse);
  return jsonResponse
}

export const main = middyfy(getProductsList);

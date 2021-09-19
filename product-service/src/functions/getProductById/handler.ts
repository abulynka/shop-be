import 'source-map-support/register';

import { formatJSONResponse, formatJSONResponseInternalServerError, ValidatedAPIGatewayProxyEvent, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { Products } from '@libs/models/Products';
import Logger from '@libs/log/logger';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: ValidatedAPIGatewayProxyEvent<string>) => {
  await new Logger().logEvent(event);

  try {
    return formatJSONResponse(
      await new Products()
        .getProductById(event.pathParameters['productId'])
    );
  } catch (e) {
    return formatJSONResponseInternalServerError();
  }
}

export const main = middyfy(getProductById);

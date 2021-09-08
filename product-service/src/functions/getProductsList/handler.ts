import 'source-map-support/register';

import { formatJSONResponseInternalServerError, ValidatedAPIGatewayProxyEvent, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { Products } from '@libs/models/Products';
import Logger from '@libs/log/logger';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: ValidatedAPIGatewayProxyEvent<string>) => {
  await new Logger().logEvent(event);

  try {
    const jsonResponse = formatJSONResponse(
      await new Products()
        .getProducts()
    );

    await new Logger().log(jsonResponse);
    return jsonResponse;
  } catch (e) {
    return formatJSONResponseInternalServerError();
  }
}

export const main = middyfy(getProductsList);

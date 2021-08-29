import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return formatJSONResponse(
      [
        {
            id: 1,
            productName: 'car1',
            price: 111
        },

        {
            id: 2,
            productName: 'car2',
            price: 222
        }
    ]
  );
}

export const main = middyfy(getProductsList);

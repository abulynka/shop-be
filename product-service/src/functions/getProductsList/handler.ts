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
            title: 'car1 title',
            description: 'car1 description',
            price: 111
        },

        {
          id: 2,
          title: 'car2 title',
          description: 'car2 description',
          price: 222
        }
    ]
  );
}

export const main = middyfy(getProductsList);

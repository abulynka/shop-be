import 'source-map-support/register';

import { formatJSONResponse, formatJSONResponseNotFound, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const productId = event.pathParameters['productId'];

  if (productId == '1') {
    return formatJSONResponse(
      {
        id: 1,
        title: 'car1 title',
        description: 'car1 description',
        price: 111
      }
    );

  } else if (productId == '2') {
    return formatJSONResponse(
      {
        id: 2,
        title: 'car2 title',
        description: 'car2 description',
        price: 222
      }
    );
  }

  return formatJSONResponseNotFound({
    message: 'Product Id = ' + productId + ' not found'
  });
}

export const main = middyfy(getProductById);

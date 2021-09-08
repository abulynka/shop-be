import 'source-map-support/register';

import type { ValidatedAPIGatewayProxyEvent, ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import Logger from '@libs/log/logger';
import { Products } from '@libs/models/Products';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event: ValidatedAPIGatewayProxyEvent<string>) => {
  await new Logger().logEvent(event);

  const productModel = new Products();
  return formatJSONResponse(
    await productModel.getProductById(
      await productModel.createProduct(event.body as { [key: string]: string })
    )
  );
}

export const main = middyfy(createProduct);

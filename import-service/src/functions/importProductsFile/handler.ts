import 'source-map-support/register';

import { ValidatedEventAPIGatewayProxyEvent, formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { S3 } from 'aws-sdk';
import schema from './schema';
import Logger from '@libs/log/logger';

const BUCKET = 'rsschool-in-aws-s3';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  await new Logger().logEvent(event);

  const catalogName = event.queryStringParameters.name;
  const catalogPath = `uploaded/${catalogName}`;

  const s3 = new S3({ region: 'eu-west-1' });
  const params = {
    Bucket: BUCKET,
    Key: catalogPath,
    Expires: 60,
    ContentType: 'text/csv'
  };

  const url = await s3.getSignedUrlPromise('putObject', params);

  return formatJSONResponse(url);
}

export const main = middyfy(importProductsFile);

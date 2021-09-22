import 'source-map-support/register';

import { ValidatedEventAPIGatewayProxyEvent, formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { S3 } from 'aws-sdk';
import schema from './schema';
import Logger from '@libs/log/logger';
import { Constants } from '@libs/constants';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  await new Logger().logEvent(event);

  const catalogName = event.queryStringParameters.name;
  const catalogPath = `uploaded/${catalogName}`;

  const constants = new Constants();

  const s3 = new S3({ region: constants.getRegion() });
  const params = {
    Bucket: constants.getBucketName(),
    Key: catalogPath,
    Expires: 60,
    ContentType: 'text/csv'
  };

  return formatJSONResponse(
    await s3.getSignedUrlPromise('putObject', params)
  );
}

export const main = middyfy(importProductsFile);

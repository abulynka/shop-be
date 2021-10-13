import 'source-map-support/register';
import { middyfy } from '@libs/lambda';
import { Handler, S3Event } from 'aws-lambda';
import { InvokeAsyncResponse } from 'aws-sdk/clients/lambda';
import { S3, SQS } from 'aws-sdk';
import { Constants } from '@libs/constants';
import csvParser from 'csv-parser';
import Logger from '@libs/log/logger';

const importFileParser: Handler = async (event: S3Event): Promise<InvokeAsyncResponse> => {
  await new Logger().logS3Event(event);

  const s3 = new S3({ region: new Constants().getRegion() });
  const constants = new Constants();

  event.Records.forEach(
    (record) => {
      const copyFromName = record.s3.object.key;
      const copyFrom = constants.getBucketName() + '/' + copyFromName;

      const s3Stream = s3.getObject({
        Bucket: constants.getBucketName(),
        Key: copyFromName
      }).createReadStream();

      s3Stream.pipe(csvParser())
        .on(
          'data',
          async (data: string) => {
            console.log(data);

            const sqs = new SQS();

            console.log('QueueUrl: ', process.env.SQS_URL);
            console.log('MessageBody', JSON.stringify(data));

            await sqs.sendMessage({
              QueueUrl: process.env.SQS_URL,
              MessageBody: JSON.stringify(data)
            }).promise();

            console.log(`Message ${JSON.stringify(data)} sent to sqs`);
        })
        .on('end', async () => {
          const copyToName = copyFromName.replace('uploaded', 'parsed');
          const copyTo = constants.getBucketName() + '/' + copyToName;

          await s3.copyObject({
            Bucket: constants.getBucketName(),
            CopySource: copyFrom,
            Key: copyToName
          }).promise();

          console.log('copied from ' + copyFrom + ' to ' + copyTo + ' finished');

          await s3.deleteObject({
            Bucket: constants.getBucketName(),
            Key: copyFromName
          }).promise();

          console.log('file ' + copyFromName + ' has been removed');
        });
    }
  );

  return {
    Status: 202
  };
}

export const main = middyfy(importFileParser);


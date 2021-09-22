import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { mocked } from 'ts-jest/utils';
import { Handler } from 'aws-lambda';
import { middyfy } from '@libs/lambda';

jest.mock('@libs/lambda');

describe('importProductsFile', () => {
  let main;
  let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

  beforeEach(async () => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('S3', 'getSignedUrl', (_name: string, _params: { [key: string]: string }, callback: Function) => {
      return callback(null, 'https://test.com/uploaded/uploaded');
    });

    mockedMiddyfy = mocked(middyfy);
    mockedMiddyfy.mockImplementation((handler: Handler) => {
      return handler as never;
    });
    main = (await import('@functions/importProductsFile/handler')).main;
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should return importProductsFile signed url', async () => {
    const event = {
      queryStringParameters: {
        name: 'uploaded'
      },
      body: {},
      headers: {},
      path: {},
      pathParameters: {}
    } as any;
    const actual = await main(event);

    await expect(actual).toEqual(
      {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
          'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
          'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
          'Content-Type': 'application/json'
        },
        body: '"https://test.com/uploaded/uploaded"'
      }
    );
  });
});

import { mocked } from 'ts-jest/utils';
import { Handler } from 'aws-lambda';
import { middyfy } from '@libs/lambda';

jest.mock('@libs/lambda');

describe('hello', () => {
  let main;
  let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

  beforeEach(async () => {
    mockedMiddyfy = mocked(middyfy);
    mockedMiddyfy.mockImplementation((handler: Handler) => {
      return handler as never;
    });
    main = (await import('@functions/hello/handler')).main;
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should return hello object', async () => {
    const event = {
      body: {
        name: 'test-name'
      }
    } as any;
    const actual = await main(event);

    expect(actual).toEqual(
        {
            body: JSON.stringify(
                {
                    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
                    event,
                }
            ),
            headers: {
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            statusCode: 200
        }
    );
  });
});

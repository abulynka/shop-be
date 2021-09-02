import { mocked } from 'ts-jest/utils';
import { Handler } from 'aws-lambda';
import { middyfy } from '@libs/lambda';

jest.mock('@libs/lambda');

describe('getProductById', () => {
  let main;
  let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

  beforeEach(async () => {
    mockedMiddyfy = mocked(middyfy);
    mockedMiddyfy.mockImplementation((handler: Handler) => {
      return handler as never;
    });
    main = (await import('@functions/getProductById/handler')).main;
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should return getProductById object', async () => {
    const event = {
        pathParameters: {
            productId: '1'
      }
    } as any;
    const actual = await main(event);
    expect(actual).toEqual(
        {
            body: JSON.stringify(
                {
                    id: 1,
                    title: 'car1 title',
                    description: 'car1 description',
                    price: 111
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

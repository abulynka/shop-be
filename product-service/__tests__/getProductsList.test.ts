import { mocked } from 'ts-jest/utils';
import { Handler } from 'aws-lambda';
import { middyfy } from '@libs/lambda';

jest.mock('@libs/lambda');

describe('getProductsList', () => {
  let main;
  let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

  beforeEach(async () => {
    mockedMiddyfy = mocked(middyfy);
    mockedMiddyfy.mockImplementation((handler: Handler) => {
      return handler as never;
    });
    main = (await import('@functions/getProductsList/handler')).main;
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should return getProductsList object', async () => {
    const event = {} as any;
    const actual = await main(event);
    expect(actual).toEqual(
        {
            body: JSON.stringify(
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
                    },
                ]
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

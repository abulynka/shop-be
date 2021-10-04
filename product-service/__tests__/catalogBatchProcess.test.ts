import { mocked } from 'ts-jest/utils';
import { Handler, SQSEvent } from 'aws-lambda';
import { middyfy } from '@libs/lambda';

jest.mock('@libs/lambda');

describe('catalogBatchProcess', () => {
    let main;
    let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

    beforeEach(async () => {
        mockedMiddyfy = mocked(middyfy);
        mockedMiddyfy.mockImplementation((handler: Handler) => {
            return handler as never;
        });
        main = (await import('@functions/catalogBatchProcess/handler')).main;
    });

    afterEach(() => {
        jest.resetModules();
    });

    it('should return catalogBatchProcess parsed products', async () => {
        const event = ({
            Records: [{
                body: "{ title: 'Car-1', description: 'Car-1 description', price: '1', count: '10' }",
            }]}) as SQSEvent;

        const actual = await main(event);

        await expect(actual).toEqual({
            body: "{ title: 'Car-1', description: 'Car-1 description', price: '1', count: '10' }",
        });
    });
});

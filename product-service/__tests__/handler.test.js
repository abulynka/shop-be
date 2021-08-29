import { expect } from '@jest/globals';
import { getProductsById, getProductsList } from '../handler';

test('getProductsById', async () => {
    return getProductsById().then(
        (result) => {
            return expect(result).toStrictEqual({
                statusCode: 200,
                body: JSON.stringify(
                    {
                        productName: 'car1',
                        price: 222,
                    }
                ),
              });
        }
    );
});

test('getProductsList', () => {
    return getProductsList().then(
        (result) => {
            return expect(result).toStrictEqual({
                    statusCode: 200,
                    body:
                        JSON.stringify (
                            [
                                {
                                    productName: 'car1',
                                    price: 111
                                },
                                {
                                    productName: 'car2',
                                    price: 222
                                }
                            ]
                        )
                  });
        }
    );
});

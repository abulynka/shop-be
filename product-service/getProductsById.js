export const getProductsById = async event => {
    console.log('getProductsById');

    return {
        statusCode: 200,
        body: JSON.stringify({
            productName: 'car1',
            price: 222,
        })
    };
}
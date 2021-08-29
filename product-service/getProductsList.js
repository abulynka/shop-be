export const getProductsList = async event => {
    console.log('getProductsList');

    return {
        statusCode: 200,
        body: JSON.stringify([
            {
                productName: 'car1',
                price: 111
            },
            {
                productName: 'car2',
                price: 222
            }
        ])
    };
}
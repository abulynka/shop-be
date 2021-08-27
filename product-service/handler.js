'use strict';

module.exports.getProductsList = async (event) => {
  return {
    statusCode: 200,
    body: {
        productName: 'car1',
        price: 123,
    },
  };
};

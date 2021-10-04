import { middyfy } from '@libs/lambda';
import { SNSNotifier } from '@libs/sns/SNSNotifier';
import { SQSEvent, SQSHandler } from 'aws-lambda';

const catalogBatchProcess: SQSHandler = async (event: SQSEvent): Promise<any> => {
    const products = [];
    event.Records.forEach(
        (e) => {
            products.push(JSON.parse(e['body']));
        }
    );

    console.log('Parsed products: ', products);

    await new SNSNotifier().notify(products);

    return products;
}

export const main = middyfy(catalogBatchProcess);
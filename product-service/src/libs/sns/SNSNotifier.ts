import { Constants } from "@libs/constants";
import { SNS } from "aws-sdk";

export class SNSNotifier {
    public async notify(products: string[]): Promise<void> {
        const sns = new SNS({
            region: new Constants().getRegion()
        });

        console.log('Send Data: ', JSON.stringify(products));
        console.log('TopicArn: ', process.env['SNS_ARN']);

        await sns.publish({
            Subject: 'Create Product Topic',
            Message: JSON.stringify(products),
            TopicArn: process.env['SNS_ARN']
        }).promise();

        await sns.publish({
            Subject: 'Create Product Topic With Filter Policy',
            Message: JSON.stringify(products),
            TopicArn: process.env['SNS_ARN'],
            MessageAttributes: {
                additional: {
                    DataType: 'String',
                    StringValue: 'data',
                },
            },
        }).promise();
    }
}
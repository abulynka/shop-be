import { ValidatedAPIGatewayProxyEvent } from "@libs/apiGateway";
import { S3Event } from "aws-lambda";

export default class Logger {
    public async log(...args: any[]): Promise<void> {
        args.forEach(e => console.log(e));
    }

    public async logEvent(event: ValidatedAPIGatewayProxyEvent<string>): Promise<void> {
        await this.log(
            'Body: ' + JSON.stringify(event.body),
            'QueryStringParameters: ' + JSON.stringify(event.queryStringParameters),
            'Headers: ' + JSON.stringify(event.headers),
            'Path: ' + JSON.stringify(event.path),
            'PathParameters: ' + JSON.stringify(event.pathParameters)
            );
    }

    public async logS3Event(event: S3Event): Promise<void> {
        await this.log(JSON.stringify(event));
    }
}
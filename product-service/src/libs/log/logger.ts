import { ValidatedAPIGatewayProxyEvent } from "@libs/apiGateway";
import { QueryResult } from "pg";

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

    public async logSQL(sql: string, params: string[]): Promise<void> {
        await this.log('SQL: ' + sql, 'Params: ' + JSON.stringify(params));
    }

    public async logSQLResult(result: QueryResult): Promise<void> {
        await this.log('SQL rows result: ' + JSON.stringify(result.rows));
    }
}
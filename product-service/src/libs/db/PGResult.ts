import Logger from "@libs/log/logger";
import { QueryResult } from "pg";

export class PGResult {
    public constructor(result: QueryResult) {
        this._result = result;
    }

    private _result: QueryResult;

    public async assocAll(): Promise<{ [key: string]: string }[]> {
        await new Logger().logSQLResult(this._result);

        return this._result.rows;
    }

    public async assoc(): Promise<{ [key: string]: string }> {
        await new Logger().logSQLResult(this._result);

        if (this._result.rowCount > 0) {
            return this._result.rows[0];
        }
        return {};
    }

    public async getOne(paramName: string): Promise<string> {
        await new Logger().logSQLResult(this._result);

        if (this._result.rowCount > 0) {
            return this._result.rows[0][paramName];
        }
        return '';
    }
}
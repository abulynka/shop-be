import { PGConfig } from "./PGConfig";
import { Client } from "pg";
import { PGResult } from "./PGResult";
import Logger from "@libs/log/logger";

export class PGClient {
    private static _instance: PGClient = null;
    private _db: Client;
    private _config: PGConfig;

    public static async getInstance(): Promise<PGClient> {
        if (PGClient._instance === null) {
            const config: PGConfig = new PGConfig();
            config.host = process.env['PG_HOST'];
            config.port = parseInt(process.env['PG_PORT']);
            config.database = process.env['PG_DATABASE'];
            config.user = process.env['PG_USERNAME'];
            config.password = process.env['PG_PASSWORD'];

            new Logger().log(JSON.stringify(config));
            
            PGClient._instance = new PGClient();
            PGClient._instance._config = config;
        }
        return PGClient._instance;
    }

    public async connect(): Promise<void> {
        this._db = new Client({
            host: this._config.host,
            port: this._config.port,
            database: this._config.database,
            user: this._config.user,
            password: this._config.password,
            ssl: false,
            connectionTimeoutMillis: 5000
        });

        await this._db.connect();
    }

    public async disconnect(): Promise<void> {
        await this._db.end();
    }

    public async begin(): Promise<void> {
        await this._db.query('begin');
    }

    public async rollback(): Promise<void> {
        await this._db.query('rollback');
    }

    public async commit(): Promise<void> {
        await this._db.query('commit');
    }

    public async query(sql: string, params?: string[]): Promise<PGResult> {
        await new Logger().logSQL(sql, params);
        const result = new PGResult(await this._db.query(sql, params));
        return result;
    }
}

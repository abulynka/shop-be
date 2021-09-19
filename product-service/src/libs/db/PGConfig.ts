export class PGConfig {
    private _host: string = '';
    private _port: number = 0;
    private _database: string = '';
    private _user: string = '';
    private _password: string = '';

    public set host(host: string) {
        this._host = host;
    }
    public get host(): string {
        return this._host;
    }

    public set port(port: number) {
        this._port = port;
    }
    public get port(): number {
        return this._port;
    }

    public set database(database: string) {
        this._database = database;
    }
    public get database(): string {
        return this._database;
    }

    public set user(user: string) {
        this._user = user;
    }
    public get user(): string {
        return this._user;
    }

    public set password(password: string) {
        this._password = password;
    }
    public get password(): string {
        return this._password;
    }
}

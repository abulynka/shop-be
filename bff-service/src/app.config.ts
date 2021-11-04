import { Injectable } from "@nestjs/common";
import {ConfigService} from "nestjs-dotenv";

@Injectable()
export class AppConfig {
    constructor(private readonly configService: ConfigService) {}

    public getServiceDomainName(serviceName): string {
        this.configService.reload();
        serviceName = serviceName.split('/').join('-');
        if (this.configService.get(serviceName)) {
            return this.configService.get(serviceName);
        }
    }

    public getPort(): number {
        return 8001;
        // const port = this.configService.get('port')
        // console.log('Config Port: ', port);
        // return parseInt(port, 10) || 8001;
    }
}

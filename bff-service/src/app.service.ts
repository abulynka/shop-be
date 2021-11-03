import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import {AxiosRequestConfig, AxiosResponse, Method} from "axios";
import {lastValueFrom} from "rxjs";

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  public async performRequest(
      method: string,
      url: string,
      params: { [key: string]: string }
  ): Promise<{
    data: string,
    status: number,
  }> {
    const requestConfig: AxiosRequestConfig = {
      method: method as Method,
      url,
      data: (method.toLowerCase() !== 'get' ? params : null),
      params: (method.toLowerCase() === 'get' ? params : null),
    };

    const response = await lastValueFrom(await this.httpService.request(requestConfig));

    return {
      data: response.data,
      status: response.status,
    };
  }
}

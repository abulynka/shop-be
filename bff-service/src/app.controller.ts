import {All, Controller, HttpStatus, Req, Res} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { AppConfig } from './app.config';

@Controller('*')
export class AppController {
  constructor(private readonly appService: AppService, private readonly appConfig: AppConfig) {}

  static productsCache = {
    cacheUnixTime: 0,
    data: '',
    status: 0,
  };

  static validCacheMSec = 2 * 60 * 1000;

  @All()
  async proxy(@Req() request: Request, @Res() response: Response) {
    const {method, body: params} = request;
    let path = request.path;

    console.log(path, method, params);

    let pathSplit = path.split('/');
    if (pathSplit[pathSplit.length - 1] === '') {
      pathSplit.pop();
      path = pathSplit.join('/');
    }

    if (method.toLowerCase() === 'get'
      && pathSplit[pathSplit.length - 1] === 'products'
      && AppController.productsCache.cacheUnixTime !== 0
      && new Date().getTime() - AppController.productsCache.cacheUnixTime < AppController.validCacheMSec) {
      return response.status(AppController.productsCache.status)
          .json(AppController.productsCache.data);
    }

    const url = this.appConfig.getServiceDomainName(path.replace('/', ''));

    if (!url) {
      return response.status(HttpStatus.BAD_GATEWAY)
          .json('Cannot process request');
    }

    const result = await this.appService.performRequest(method, `${url}${path}`, params);

    if (method.toLowerCase() === 'get'
      && pathSplit[pathSplit.length - 1] === 'products') {
      AppController.productsCache.cacheUnixTime = new Date().getTime();
      AppController.productsCache.data = result.data;
      AppController.productsCache.status = result.status;
    }

    return response.status(result.status)
        .json(result.data);
  }
}

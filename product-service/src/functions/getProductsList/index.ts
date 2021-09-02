import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true
      },
      response: {
        parameters: {
          headers: {
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        }
      }
    }
  ]
}

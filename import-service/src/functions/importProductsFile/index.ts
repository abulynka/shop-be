import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        authorizer: {
          name: 'authorizer',
          arn: '${self:custom.authorizerArn}',
          type: 'REQUEST',
        },
        request: {
          parameters: {
            querystrings: {
              name: {
                required: true
              }
            }
          }
        }
      },
    }
  ]
}

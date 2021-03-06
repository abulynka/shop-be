import { handlerPath } from '@libs/handlerResolver';
// import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
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

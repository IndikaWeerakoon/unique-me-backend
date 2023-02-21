import { handlerPath } from '@libs/handler-resolver';

export default {
    handler:  `${handlerPath(__dirname)}/handler.main`,
    events: [
      {
        http: {
          method: 'get',
          path: 'person/{id}',
          request: {
            parameters: {
              querystrings: {
                name: true,
              },
            },
          },
        },
      }
    ],
    environment: {
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  };
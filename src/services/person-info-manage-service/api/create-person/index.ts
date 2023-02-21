import { handlerPath } from '@libs/handler-resolver';
import schema from './schema';

export default {
    handler:  `${handlerPath(__dirname)}/handler.main`,
    events: [
      {
        http: {
          method: 'post',
          path: 'person',
          request: {
            schemas: {
              'application/json': schema,
            },
          },
        },
      }
    ],
    environment: {
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  };
import { handlerPath } from '@libs/handler-resolver';
import schema from './schema';

export default {
    handler:  `${handlerPath(__dirname)}/handler.main`,
    events: [
      {
        http: {
          method: 'post',
          path: 'persons',
          request: {
            schemas: {
              'application/json': schema,
            },
          },
          authorizer: {
            type: 'COGNITO_USER_POOLS',
            authorizerId: {
              Ref: 'Authorizer'
            }

          }
        },
      }
    ],
    timeout: 10,
    environment: {
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DB_URI: process.env.DB_URI
    },
  };
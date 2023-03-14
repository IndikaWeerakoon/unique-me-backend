import { handlerPath } from '@libs/handler-resolver';

export default {
    handler:  `${handlerPath(__dirname)}/handler.main`,
    events: [
      {
        http: {
          method: 'get',
          path: 'persons/{id}',
          authorizer: {
            type: 'COGNITO_USER_POOLS',
            authorizerId: {
              Ref: 'Authorizer'
            }

          }
        },
      }
    ],
    environment: {
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      DB_URI: process.env.DB_URI
    },
  };
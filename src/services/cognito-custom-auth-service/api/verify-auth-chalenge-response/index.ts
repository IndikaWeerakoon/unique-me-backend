import { handlerPath } from '@libs/handler-resolver';

export default {
    handler:  `${handlerPath(__dirname)}/handler.main`,
    events: [
      {
        cognitoUserPool: {
            pool: 'uniqueme-${self:provider.stage}-user-pool',
            trigger: "VerifyAuthChallengeResponse",
            existing: true
        },
      }
    ],
};
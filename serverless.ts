// import hello from '@functions/hello';
// import {AWS} from '@serverless/typescript';
import { functions as personInfoFunctions } from '@pims/api';
import { functions as cognitoCustomeFunction } from '@ccas/api'
import { CognitoUserPool, CognitoUserPoolClient } from '@res/cognito.resource';
import { OtpSmsTopic, OtpSmsTopicPolicy, CognitoSmsRole } from '@res/sns.resouce';
import { LambdaSnsPublish } from '@res/roles.resource';
import { Authorizer } from '@res/autherizer.resource';

const serverlessConfiguration = {
  useDotenv: true,
  service: 'unique-me-backend',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    profile: 'unique-me',
    region: 'us-east-1',
    stackName: '${self:service}-stack-${sls:stage}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  functions: {
    ...personInfoFunctions,
    ...cognitoCustomeFunction,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      OtpSmsTopic,
      OtpSmsTopicPolicy,
      CognitoSmsRole,
      CognitoUserPool,
      CognitoUserPoolClient,
      LambdaSnsPublish,
      Authorizer
    }
  }
};

module.exports = serverlessConfiguration;

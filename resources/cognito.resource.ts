import { Resource } from "./type/resource.type";

export const CognitoUserPool:Resource = {
    Type: 'AWS::Cognito::UserPool',
    Properties: {
        UserPoolName: 'uniqueme-${self:provider.stage}-user-pool',
        UsernameAttributes: ['phone_number'],
        AutoVerifiedAttributes: ['email'], 
        SmsConfiguration: {
            ExternalId: 'unique-me-external-id',
            SnsCallerArn: { "Fn::GetAtt": ["CognitoSmsRole", "Arn"] }
        },
        VerificationMessageTemplate: {
            SmsMessage: 'Your verification code for unique-mie is {####}.'
        },
        // LambdaConfig: {
        //     PreSignUp: {
        //       'Fn::GetAtt': ['unique-me-backend-dev-pre-signup', 'Arn'],
        //     },
        //     PostAuthentication: {
        //       'Fn::GetAtt': ['unique-me-backend-dev-post-authentication', 'Arn'],
        //     },
        //     DefineAuthChallenge: {
        //       'Fn::GetAtt': ['unique-me-backend-dev-define-auth-challenge', 'Arn'],
        //     },
        //     CreateAuthChallenge: {
        //       'Fn::GetAtt': ['unique-me-backend-dev-create-auth-challenge', 'Arn'],
        //     },
        //     VerifyAuthChallengeResponse: {
        //       'Fn::GetAtt': ['unique-me-backend-dev-verify-auth-chalenge-response', 'Arn'],
        //     },
        //   },
    }
}

export const CognitoUserPoolClient:Resource = {
    Type: 'AWS::Cognito::UserPoolClient',
    Properties: {
        ClientName: 'uniqueme-${self:provider.stage}-user-pool-client',
        UserPoolId: {
            Ref: 'CognitoUserPool'
        },
        ExplicitAuthFlows: ['CUSTOM_AUTH_FLOW_ONLY'],
        GenerateSecret: false
         
    }
}
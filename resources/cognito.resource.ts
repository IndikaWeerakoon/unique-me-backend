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
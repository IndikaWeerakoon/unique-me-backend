import { Resource } from "./type/resource.type";

export const OtpSmsTopic: Resource = {
    Type: 'AWS::SNS::Topic',
    Properties: {
        DisplayName: 'Custom SMS Sender',
        TopicName: 'otp-sms-topic'
    }
}

export const OtpSmsTopicPolicy: Resource =  {
    Type: 'AWS::SNS::TopicPolicy',
    Properties: {
      PolicyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              Service: 'cognito-idp.amazonaws.com',
            },
            Action: 'sns:Publish',
            Resource: { Ref: 'OtpSmsTopic' },
          },
        ],
      },
      Topics: [{ Ref: 'OtpSmsTopic' }],
    },
}

export const CognitoSmsRole: Resource =  {
    Type: 'AWS::IAM::Role',
    Properties: {
        RoleName: 'CognitoSmsRole',
        AssumeRolePolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: {
                  Service: "cognito-idp.amazonaws.com",
                },
                Action: ["sts:AssumeRole"],
                Condition: {
                    StringEquals: {
                        'sts:ExternalId': 'unique-me-external-id'
                    }
                }
              },
            ],
        },
        Policies: [
            {
              PolicyName: "sns-publish-policy",
              PolicyDocument: {
                Version: "2012-10-17",
                Statement: [
                  {
                    Effect: "Allow",
                    Action: ["sns:Publish"],
                    Resource: '*',
                  },
                ],
              },
            },
        ],
    },
}
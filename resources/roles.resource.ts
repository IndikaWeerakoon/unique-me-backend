import { Resource } from "./type/resource.type";

export const LambdaSnsPublish: Resource =  {
    Type: 'AWS::IAM::Role',
    Properties: {
        RoleName: 'lambda-sns-publish',
        AssumeRolePolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: {
                  Service: "lambda.amazonaws.com",
                },
                Action: ["sts:AssumeRole"],
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
                  {
                        Action: [
                            "logs:CreateLogStream",
                            "logs:CreateLogGroup"
                        ],
                        Resource: [
                            "*"
                        ],
                        Effect: "Allow"
                    },
                    {
                        Action: [
                            "logs:PutLogEvents"
                        ],
                        Resource: [
                            "*"
                        ],
                        Effect: "Allow"
                    }
                ],
              },
            },
        ],
    },
}
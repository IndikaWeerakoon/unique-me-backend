import { Resource } from "./type/resource.type";

export const Authorizer: Resource = {
    Type: "AWS::ApiGateway::Authorizer",
    Properties: {
        Name: 'uniqueme-authorizer',
        RestApiId: {
            Ref: 'ApiGatewayRestApi'
        },
        Type: 'COGNITO_USER_POOLS',
        IdentitySource: 'method.request.header.Authorization',
        ProviderARNs:  [{ "Fn::GetAtt": ["CognitoUserPool", "Arn"] }],
    }
}
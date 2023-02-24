import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: any) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const formatJSONNotFoundResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 404,
    body: JSON.stringify(response)
  }
}

export const formatJSONBadRequestResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 400,
    body: JSON.stringify(response)
  }
}

export const formatJSONServerErrorResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 500,
    body: JSON.stringify(response)
  }
}

import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {APIGatewayEvent} from 'aws-lambda';

// import schema from './schema';
import { PersonService } from '@pims/service/person.service';

const retrivePerson = async (event: APIGatewayEvent) => {
  const service = new PersonService();
  const response = service.retrive(event.pathParameters.id, event.queryStringParameters.name);
  return formatJSONResponse(response);
};

export const main = middyfy(retrivePerson);


  
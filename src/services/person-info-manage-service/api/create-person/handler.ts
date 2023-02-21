import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { PersonService } from '@pims/service/person.service';
import schema from './schema';
import { Person } from '../../dto/person.dto';

const createPerson: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const service = new PersonService();
  const response = service.create(event.body as Person);
  return formatJSONResponse(response);
};

export const main = middyfy(createPerson);


  
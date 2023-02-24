import { formatJSONServerErrorResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { PersonService } from '@pims/service/person.service';
import schema from './schema';
import { connect } from '@libs/db-connection';
import { IPerson } from '@services/person-info-manage-service/modal/person.modal';

const createPerson: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  // Set to false to send the response right away when the callback runs, instead of waiting for the Node.js event loop to be empty
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    //create db connection
    await connect();
    const service = new PersonService();
    const response = await service.createPerson(event.body as IPerson);
    return formatJSONResponse(response);
  } catch (err) {
    console.log(err);
    return formatJSONServerErrorResponse({ message: err.message});
  }
  
};

export const main = middyfy(createPerson);


  
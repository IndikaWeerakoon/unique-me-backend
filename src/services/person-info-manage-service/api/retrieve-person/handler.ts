import { formatJSONResponse, formatJSONServerErrorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import {APIGatewayEvent} from 'aws-lambda';

// import schema from './schema';
import { PersonService } from '@pims/service/person.service';
import { connect } from '@libs/db-connection';

const retrivePerson = async (event: APIGatewayEvent, context) => {
  // Set to false to send the response right away when the callback runs, instead of waiting for the Node.js event loop to be empty
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    //db connection
    await connect();
    const service = new PersonService();
    const response = await service.retrivePerson(event.pathParameters.id);
    return formatJSONResponse(response);
  } catch (err) {
    console.log(err);
    return formatJSONServerErrorResponse({ message: err.message});
  }
};

export const main = middyfy(retrivePerson);


  
import { Handler } from 'aws-lambda';

const preSignUp: Handler = async (event) => {
    event.response.autoConfirmUser = true;
    event.response.autoVerifyPhone = true;
    return event;
};

export const main =  preSignUp;
import { Handler } from 'aws-lambda';

const verifyAuthChallenge: Handler = async (event) => {
    console.log(event.request);
    
    const expectedAnswer = event.request.privateChallengeParameters.secretLoginCode; 
    console.log('challenge comparison', event.request.challengeAnswer === expectedAnswer)
    if (event.request.challengeAnswer === expectedAnswer) {
        event.response.answerCorrect = true;
    } else {
        event.response.answerCorrect = false;
    }
    
    return event;
};

export const main = verifyAuthChallenge;
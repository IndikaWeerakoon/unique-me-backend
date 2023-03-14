import { Handler } from 'aws-lambda';

const defineAuthChallenge: Handler = async (event) => {
    console.log(event.request);
    
    // If user is not registered
    if (event.request.userNotFound) {
        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        throw new Error('invalid otp')
    }
    
    if (event.request.session.length > 3 && event.request.session.slice(-1)[0].challengeResult === false) { // wrong OTP even After 3 sessions?
        console.log('invalid token')
        event.response.issueTokens = false;
        event.response.failAuthentication = true;
        
    } else if (event.request.session.length > 0 
        && event.request.session.slice(-1)[0].challengeName === 'CUSTOM_CHALLENGE'
        && event.request.session.slice(-1)[0].challengeResult === true) { // Correct OTP!
        console.log('login success, token issued')
        event.response.issueTokens = true;
        event.response.failAuthentication = false;
    } else { // not yet received correct OTP
        event.response.issueTokens = false;
        event.response.failAuthentication = false;
        event.response.challengeName = 'CUSTOM_CHALLENGE';
    }
    
    console.log(event)
    return event;
};

export const main =  defineAuthChallenge;
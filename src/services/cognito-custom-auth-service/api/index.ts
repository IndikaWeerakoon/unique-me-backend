import createAuthChallenge from './create-auth-chalenge';
import defineAuthChallenge from './define-auth-challenge';
import postAuthentication from './post-authentication';
import preSignup from './pre-signup';
import verifyAuthChalengeResponse from './verify-auth-chalenge-response';

export const functions = {
    'create-auth-challenge': createAuthChallenge,
    'define-auth-challenge': defineAuthChallenge,
    'post-authentication': postAuthentication,
    'pre-signup': preSignup,
    'verify-auth-chalenge-response': verifyAuthChalengeResponse
}
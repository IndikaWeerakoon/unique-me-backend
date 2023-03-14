
import { Handler } from 'aws-lambda';
import { resolve } from 'path';
// import { SNS } from 'aws-sdk';
import ShoutoutClient from 'shoutout-sdk';



async function sendSMS(phone: string, code: string) {
    const apiKey = process.env.SHOUTOUT_KEY;
    const debug = true, verifySSL = false;
    const client = new ShoutoutClient(apiKey, debug, verifySSL);
    const sms = `Your UniqueMIE one time password(OTP): ${code}`
    const message = {
        source: 'ShoutDEMO',
        destinations: [phone],
        content: {
            sms,
        },
        transports: ['sms'],
      };
    const shoutoutPromise = new Promise((res,rej) => {
        client.sendMessage(message, (error, result) => {
        if (error) {
            console.error(`Sout-out error response: ${JSON.stringify(error.message)}`);
            rej(error);
        } else {
            console.log(JSON.stringify(result));
            res(result);
        }
        });
    });

    return shoutoutPromise;
    
    // const params = {
    //   Message: code, /* required */
    //   PhoneNumber: phone,
    // };
    
    // return new SNS({apiVersion: '2010-03-31'}).publish(params).promise();
}
const createAuthChallenge: Handler = async (event) => {

    let secretLoginCode: string;

    if (!event.request.session || !event.request.session.length) {
        // Generate a new secret login code and send it to the user
        secretLoginCode = Date.now().toString().slice(-4);
        try {
            await sendSMS(event.request.userAttributes.phone_number, secretLoginCode);
            console.log(`Token: ${secretLoginCode}`)
        } catch(error) {
           console.log(`error occured: ${error.message}`)
        }
    } else {
        // re-use code generated in previous challenge
        const previousChallenge = event.request.session.slice(-1)[0];
        secretLoginCode = previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1];
    }
    console.log(event.request.userAttributes);
    // Add the secret login code to the private challenge parameters
    // so it can be verified by the "Verify Auth Challenge Response" trigger
    event.response.privateChallengeParameters = { secretLoginCode };
    // Add the secret login code to the session so it is available
    // in a next invocation of the "Create Auth Challenge" trigger
    event.response.challengeMetadata = `CODE-${secretLoginCode}`;
    
    return event;
};

export const main = createAuthChallenge;
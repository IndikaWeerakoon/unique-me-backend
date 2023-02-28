const postAuthentication = async (event) => {
    // Do any necessary post-authentication actions
    console.log(`User ${event.userName} authenticated successfully!`);

    // Return the event
    return event;
};
  
export const main = postAuthentication;
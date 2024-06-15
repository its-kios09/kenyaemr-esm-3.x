export const initiateStkPush = async (
  payload,
  initiateUrl: string,
  authorizationUrl: string,
  setNotification: (notification: { type: 'error' | 'success'; message: string }) => void,
) => {
  try {
    // the backend URL for now we can use this one temporarily.
    const url = 'https://compass-tau.vercel.app/api/mpesa/stk-push';
    // const url = 'http://localhost:3000/api/mpesa/stk-push';

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        phoneNumber: payload.PhoneNumber,
        amount: payload.Amount,
        accountReference: payload.AccountReference,
      }),
      mode: `no-cors`,
    });
    setNotification({ message: 'Success', type: 'success' });
  } catch (err) {
    console.error(err);
    setNotification({ message: 'Unable to initiate Lipa Na Mpesa, please try again later.', type: 'error' });
    throw err;
  }
};

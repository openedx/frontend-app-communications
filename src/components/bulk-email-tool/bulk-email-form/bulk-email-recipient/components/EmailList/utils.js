/* eslint-disable import/prefer-default-export */
export const isValidEmail = (email) => {
  const emailRegex = /^(([^<>()·=~ºªÇ¨?¿*^|#¢∞¬÷"$%"≠´}{![\]\\.,;:\s@"]+(\.[^<>·$%&/=~ºªÇ¨?¿*^|#¢∞¬÷""≠´}{!()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

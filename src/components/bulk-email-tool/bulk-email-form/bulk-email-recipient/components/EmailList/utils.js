/* eslint-disable import/prefer-default-export */
// ref: https://github.com/openedx/frontend-app-authn/blob/master/src/data/constants.js#L31
const emailRegex = /^[-!#$%&'*+/=?^_`{}|~0-9A-Za-z]+(\.[-!#$%&'*+/=?^_`{}|~0-9A-Za-z]+)*'|^"([\x20-\x21\x23-\x5b\x5d-\x7e]|\\[\x20-\x7e])*"|@((?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+)(?:[A-Za-z0-9-]{2,63})|\[(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}]$/;

export const isValidEmail = (email) => emailRegex.test(email);

export const fetchScheduledEmails = () => ({
  type: 'FETCH_SCHEDULED_EMAILS',
});

export const fetchScheduledEmailsStart = () => ({
  type: 'FETCH_START',
});

export const fetchScheduledEmailsComplete = (payload) => ({
  type: 'FETCH_COMPLETE',
  payload,
});

export const fetchScheduledEmailsError = () => ({
  type: 'FETCH_FAILURE',
});

export const deleteScheduledEmail = () => ({
  type: 'DELETE_SCHEDULED_EMAIL',
});
export const deleteScheduledEmailStart = () => ({
  type: 'DELETE_START',
});

export const deleteScheduledEmailComplete = () => ({
  type: 'DELETE_COMPLETE',
});

export const deleteScheduledEmailError = () => ({
  type: 'DELETE_FAILURE',
});

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

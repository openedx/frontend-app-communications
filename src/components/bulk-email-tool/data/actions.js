export const fetchScheduledEmails = () => ({
  type: 'FETCH_SCHEDULED_EMAILS',
});

export const fetchScheduledEmailsStart = () => ({
  type: 'FETCH_START',
});

export const fetchScheduledEmailsComplete = (scheduledEmails) => ({
  type: 'FETCH_COMPLETE',
  payload: { scheduledEmails },
});

export const fetchScheduledEmailsError = () => ({
  type: 'FETCH_ERROR',
});

export const copyToEditor = (body, subject) => ({
  type: 'COPY_TO_EDITOR',
  payload: {
    emailBody: body,
    emailSubject: subject,
  },
});

export const handleEditorChange = (fieldName, fieldValue) => ({
  type: 'EDITOR_ON_CHANGE',
  payload: {
    [fieldName]: fieldValue,
  },
});

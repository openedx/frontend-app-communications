export const handleEditorChange = (fieldName, fieldValue) => ({
  type: 'EDITOR_ON_CHANGE',
  payload: {
    [fieldName]: fieldValue,
  },
});

export const copyToEditor = (body, subject) => ({
  type: 'COPY_TO_EDITOR',
  payload: {
    emailBody: body,
    emailSubject: subject,
  },
});

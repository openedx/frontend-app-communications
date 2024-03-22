import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  /* SubjectForm.jsx Messages */
  bulkEmailSubjectLabel: {
    id: 'bulk.email.subject.label',
    defaultMessage: 'Subject',
    description: 'Email subject line input label. Meant to have colon or equivalent punctuation.',
  },
  bulkEmailFormSubjectError: {
    id: 'bulk.email.form.subject.error',
    defaultMessage: 'A subject is required',
    description: 'An Error message located under the subject line. Visible only on failure.',
  },
});

export default messages;

import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  /* index.jsx Messages */
  bodyFormFieldLabel: {
    id: 'body.form.field.label',
    defaultMessage: 'Body',
    description: 'Email Body label. Meant to have colon or equivalent punctuation.',
  },
  bodyFormFieldError: {
    id: 'body.form.field.error',
    defaultMessage: 'The message cannot be blank',
    description: 'An error message located under the body editor. Visible only on failure.',
  },
});

export default messages;

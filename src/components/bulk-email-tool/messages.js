import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  bulkEmailRecipientsMyselfLabel: {
    id: 'bulk.email.recipients.myself.label',
    defaultMessage: 'Myself',
    description: 'Label for selecting the option to send a bulk email to oneself.',
  },
  bulkEmailRecipientsStaffLabel: {
    id: 'bulk.email.recipients.staff.label',
    defaultMessage: 'Staff and instructors',
    description: 'Label for selecting the option to send a bulk email to all staff and instructors.',
  },
  bulkEmailRecipientsLearnersLabel: {
    id: 'bulk.email.recipients.learners.label',
    defaultMessage: 'All learners',
    description: 'Label for selecting the option to send a bulk email to all learners.',
  },
});

export default messages;

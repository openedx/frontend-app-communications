export const RECIPIENTS_DISPLAY_NAMES = {
  myself: 'Myself',
  staff: 'Staff and instructors',
  learners: 'All students',
};

// Output: { 'Myself': 'myself', 'Staff and instructors': 'staff', 'All students': 'learners' }
export const REVERSE_RECIPIENTS_DISPLAY_NAMES = Object.fromEntries(
  Object.entries(RECIPIENTS_DISPLAY_NAMES).map(([key, value]) => [value, key]),
);

export const getDisplayTextFromRecipient = (recipient) => RECIPIENTS_DISPLAY_NAMES[recipient] || recipient;

export const getRecipientFromDisplayText = (recipient) => REVERSE_RECIPIENTS_DISPLAY_NAMES[recipient] || recipient;

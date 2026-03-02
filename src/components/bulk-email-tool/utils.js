import { DEFAULT_RECIPIENTS_GROUPS } from './constants';
import messages from './messages';

export const RECIPIENTS_DISPLAY_NAMES = {
  [DEFAULT_RECIPIENTS_GROUPS.SELF]: messages.bulkEmailRecipientsMyselfLabel,
  [DEFAULT_RECIPIENTS_GROUPS.STAFF]: messages.bulkEmailRecipientsStaffLabel,
  [DEFAULT_RECIPIENTS_GROUPS.ALL_LEARNERS]: messages.bulkEmailRecipientsLearnersLabel,
};

/**
 * Retrieves the display text for a given recipient.
 *
 * @param {Object} intl - The internationalization object, provided by React Intl.
 * @param {string} recipient - The recipient key used to look up the corresponding display name.
 * @returns {string} - The formatted display name for the recipient,
 * or the original recipient key if no display name is found.
 */
export const getDisplayTextFromRecipient = (intl, recipient) => {
  const msg = RECIPIENTS_DISPLAY_NAMES[recipient];
  return msg ? intl.formatMessage(msg) : recipient; // Fall back to the recipient key if no display name is found.
};

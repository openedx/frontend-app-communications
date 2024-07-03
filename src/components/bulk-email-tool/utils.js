export const RECIPIENTS_DISPLAY_NAMES = {
  myself: 'Myself',
  staff: 'Staff/Administrators',
  learners: 'All Learners',
};

export const HISTORY_RECIPIENTS_DISPLAY_NAMES = {
  'Staff and instructors': 'Staff/Administrators',
  'All students': 'All Learners',
};

// Output: { 'Myself': 'myself', 'Staff/Administrators': 'staff', 'All Learners': 'learners' }
export const REVERSE_RECIPIENTS_DISPLAY_NAMES = Object.fromEntries(
  Object.entries(RECIPIENTS_DISPLAY_NAMES).map(([key, value]) => [value, key]),
);

export const getDisplayText = (recipient, courseModes) => {
  const normalizedRecipient = recipient.replace(/-/, ':');

  if (normalizedRecipient.startsWith('track') && courseModes) {
    const courseModeSlug = normalizedRecipient.split(':')[1];
    const courseMode = courseModes.find((mode) => mode.slug === courseModeSlug);
    if (courseMode) {
      return `Learners in the ${courseMode.name} Track`;
    }
  }

  if (normalizedRecipient.startsWith('cohort')) {
    const cohort = normalizedRecipient.replace(/:/, ': ');
    return cohort.charAt(0).toUpperCase() + cohort.slice(1);
  }

  return RECIPIENTS_DISPLAY_NAMES[recipient] || recipient;
};

export const getRecipientFromDisplayText = (displayText, courseModes) => {
  const trackMatch = displayText.match(/^Learners in the (.+) Track$/);
  if (trackMatch) {
    const courseModeName = trackMatch[1];
    const courseMode = courseModes.find(mode => mode.name === courseModeName);
    if (courseMode) {
      return `track:${courseMode.slug}`;
    }
  }

  const cohortMatch = displayText.match(/^Cohort: (.+)$/);
  if (cohortMatch) {
    return `cohort:${cohortMatch[1].replace(' ', '-')}`;
  }

  return REVERSE_RECIPIENTS_DISPLAY_NAMES[displayText] || displayText;
};

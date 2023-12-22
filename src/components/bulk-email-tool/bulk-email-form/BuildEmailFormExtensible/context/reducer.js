import { produce } from 'immer';

export const INITIAL_STATE = {
  form: {
    isFormValid: true,
    isFormSubmitted: false,
    scheduleValid: true,
    isScheduled: false,
    isEditMode: false,
    formStatus: 'default',
    isScheduleButtonClicked: false,
    courseId: '',
    cohorts: '',
    scheduleDate: '',
    scheduleTime: '',
    isScheduledSubmitted: false,
    emailId: '',
    schedulingId: '',
    emailRecipients: [],
    subject: '',
    body: '',
  },
};
const ActionTypes = {
  UPDATE_FORM: 'UPDATE_FORM',
  RESET_FORM: 'RESET_FORM',
};

export const actionCreators = {
  updateForm: (updates) => ({ type: ActionTypes.UPDATE_FORM, updates }),
  resetForm: () => ({ type: ActionTypes.RESET_FORM }),
};

// eslint-disable-next-line consistent-return
export const reducer = produce((draft, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_FORM: {
      Object.assign(draft.form, action.updates);
      break; // No explicit return needed due to 'produce' creating a draft
    }
    case ActionTypes.RESET_FORM: {
      // Resets to initial form state
      return INITIAL_STATE;
    }
    // Add other case handlers if needed
    default:
      // No changes, return the current state
      break;
  }
}, INITIAL_STATE);

import {
  copyToEditor,
  fetchScheduledEmails,
  fetchScheduledEmailsComplete,
  fetchScheduledEmailsError,
  fetchScheduledEmailsStart,
} from './actions';
import { getScheduledBulkEmailData } from './api';

export function getScheduledBulkEmailThunk(courseId) {
  return async (dispatch) => {
    dispatch(fetchScheduledEmails());
    dispatch(fetchScheduledEmailsStart());
    try {
      const data = await getScheduledBulkEmailData(courseId);
      if (!!data && data.results) {
        dispatch(fetchScheduledEmailsComplete(data.results));
      }
    } catch (error) {
      dispatch(fetchScheduledEmailsError());
    }
  };
}

export function copyTextToEditorThunk(body, subject) {
  return async (dispatch) => {
    dispatch(copyToEditor(body, subject));
  };
}

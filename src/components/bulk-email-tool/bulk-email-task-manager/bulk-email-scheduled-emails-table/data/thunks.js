import {
  fetchScheduledEmails,
  fetchScheduledEmailsComplete,
  fetchScheduledEmailsError,
  fetchScheduledEmailsStart,
} from './actions';
import { getScheduledBulkEmailData } from './api';

// eslint-disable-next-line import/prefer-default-export
export function getScheduledBulkEmailThunk(courseId, page) {
  return async (dispatch) => {
    dispatch(fetchScheduledEmails());
    dispatch(fetchScheduledEmailsStart());
    function onComplete(data) {
      dispatch(fetchScheduledEmailsComplete(data));
      return data;
    }
    function onError(error) {
      dispatch(fetchScheduledEmailsError());
      return error;
    }
    try {
      const data = await getScheduledBulkEmailData(courseId, page);
      return onComplete(data);
    } catch (error) {
      return onError(error);
    }
  };
}

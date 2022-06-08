import {
  deleteScheduledEmail,
  deleteScheduledEmailComplete,
  deleteScheduledEmailError,
  deleteScheduledEmailStart,
  fetchScheduledEmails,
  fetchScheduledEmailsComplete,
  fetchScheduledEmailsError,
  fetchScheduledEmailsStart,
} from './actions';
import { deleteScheduledBulkEmailInstructorTask, getScheduledBulkEmailIntructorTaskData } from './api';

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
      const data = await getScheduledBulkEmailIntructorTaskData(courseId, page);
      return onComplete(data);
    } catch (error) {
      return onError(error);
    }
  };
}

export function deleteScheduledEmailThunk(courseId, emailIndex) {
  return async (dispatch) => {
    dispatch(deleteScheduledEmail());
    dispatch(deleteScheduledEmailStart());
    function onComplete(data) {
      dispatch(deleteScheduledEmailComplete(data));
      return data;
    }
    function onError(error) {
      dispatch(deleteScheduledEmailError());
      return error;
    }
    try {
      const status = await deleteScheduledBulkEmailInstructorTask(courseId, emailIndex);
      return onComplete(status);
    } catch (error) {
      return onError(error);
    }
  };
}

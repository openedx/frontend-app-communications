import {
  patchScheduledEmail,
  patchScheduledEmailComplete,
  patchScheduledEmailError,
  patchScheduledEmailStart,
  postBulkEmail,
  postBulkEmailComplete,
  postBulkEmailError,
  postBulkEmailStart,
} from './actions';
import { patchScheduledBulkEmailInstructorTask, postBulkEmailInstructorTask } from './api';

export function postBulkEmailThunk(emailData, courseId) {
  return async (dispatch) => {
    dispatch(postBulkEmail());
    dispatch(postBulkEmailStart());
    function onComplete(data) {
      dispatch(postBulkEmailComplete());
      return data;
    }
    function onError(error) {
      dispatch(postBulkEmailError());
      return error;
    }
    try {
      const data = await postBulkEmailInstructorTask(emailData, courseId);
      return onComplete(data);
    } catch (error) {
      return onError(error);
    }
  };
}

export function editScheduledEmailThunk(emailData, courseId, schedulingId) {
  return async (dispatch) => {
    dispatch(patchScheduledEmail());
    dispatch(patchScheduledEmailStart());
    function onComplete(data) {
      dispatch(patchScheduledEmailComplete());
      return data;
    }
    function onError(error) {
      dispatch(patchScheduledEmailError());
      return error;
    }
    try {
      const data = await patchScheduledBulkEmailInstructorTask(emailData, courseId, schedulingId);
      return onComplete(data);
    } catch (error) {
      return onError(error);
    }
  };
}

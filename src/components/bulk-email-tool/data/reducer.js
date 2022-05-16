import { logError, logInfo } from '@edx/frontend-platform/logging';

export default function BulkEmailReducer(state, action) {
  switch (action.type) {
    case 'FETCH_SCHEDULED_EMAILS':
      logInfo(action.type, state);
      return state;
    case 'FETCH_START':
      logInfo(action.type, state);
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_COMPLETE':
      logInfo(action.type, state);
      return {
        ...state,
        isLoading: false,
        errorRetrievingData: false,
        ...action.payload,
      };
    case 'FETCH_FAILURE':
      logError(action.type, state);
      return {
        ...state,
        isLoading: false,
        errorRetrievingData: true,
      };
    case 'COPY_TO_EDITOR':
      logInfo(action.type, state);
      return {
        ...state,
        editor: {
          ...action.payload,
        },
      };
    case 'EDITOR_ON_CHANGE':
      logInfo(action.type, state);
      return {
        ...state,
        editor: {
          ...state.editor,
          ...action.payload,
        },
      };
    default:
      throw new Error();
  }
}

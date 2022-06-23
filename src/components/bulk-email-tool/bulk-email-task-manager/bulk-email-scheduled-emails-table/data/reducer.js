export function scheduledEmailsTableReducer(state, action) {
  switch (action.type) {
    case 'FETCH_SCHEDULED_EMAILS':
      return state;
    case 'FETCH_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_COMPLETE':
      return {
        ...state,
        isLoading: false,
        errorRetrievingData: false,
        ...action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        errorRetrievingData: true,
      };
    case 'DELETE_SCHEDULED_EMAIL':
      return state;
    case 'DELETE_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'DELETE_COMPLETE':
      return {
        ...state,
        isLoading: false,
        errorRetrievingData: false,
        ...action.payload,
      };
    case 'DELETE_FAILURE':
      return {
        ...state,
        isLoading: false,
        errorRetrievingData: true,
      };
    default:
      return state;
  }
}

export const scheduledEmailsTableInitialState = {
  results: [],
  isLoading: false,
  errorRetrievingData: false,
  count: 0,
  numPages: 0,
  currentPage: 0,
  start: 0,
  previous: null,
  next: null,
};

export default scheduledEmailsTableReducer;

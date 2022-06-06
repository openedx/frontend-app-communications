export function editorReducer(state, action) {
  switch (action.type) {
    case 'EDITOR_ON_CHANGE':
      return {
        ...state,
        ...action.payload,
      };
    case 'COPY_TO_EDITOR':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export const editorInitialState = {
  emailBody: '',
  emailSubject: '',
  emailDate: '',
  emailTime: '',
};

export default editorReducer;

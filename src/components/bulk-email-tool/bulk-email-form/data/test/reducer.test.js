import { initializeMockApp } from '../../../../../setupTest';
import { editorReducer } from '../reducer';

describe('editorReducer', () => {
  const testState = {
    emailBody: '',
    emailSubject: '',
    emailDate: '',
    emailTime: '',
  };
  beforeAll(async () => {
    await initializeMockApp();
  });

  it('does not remove present data from slice when EDITOR_ON_CHANGE action dispatched', () => {
    const newEditorState = {
      emailBody: 'test',
    };
    const returnedState = editorReducer(testState, { type: 'EDITOR_ON_CHANGE', payload: newEditorState });
    const finalState = {
      emailBody: 'test',
      emailSubject: '',
      emailDate: '',
      emailTime: '',
    };
    expect(returnedState).toEqual(finalState);
  });

  it('it copies full editor state when COPY_TO_EDITOR action dispatched', () => {
    const newEditorState = {
      emailBody: 'test',
      emailSubject: 'test',
      emailRecipient: ['test'],
      emailSchedule: 'test',
    };
    const finalState = {
      ...testState,
      ...newEditorState,
    };
    const returnedState = editorReducer(testState, { type: 'COPY_TO_EDITOR', payload: newEditorState });
    expect(returnedState).toEqual(finalState);
  });
});

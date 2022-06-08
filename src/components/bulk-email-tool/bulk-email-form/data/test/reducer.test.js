import { initializeMockApp } from '../../../../../setupTest';
import { editorInitialState, editorReducer } from '../reducer';

describe('editorReducer', () => {
  const testState = editorInitialState;
  beforeAll(async () => {
    await initializeMockApp();
  });

  it('does not remove present data from slice when EDITOR_ON_CHANGE action dispatched', () => {
    const newEditorState = {
      emailBody: 'test',
    };
    const returnedState = editorReducer(testState, { type: 'EDITOR_ON_CHANGE', payload: newEditorState });
    const finalState = {
      ...testState,
      emailBody: 'test',
    };
    expect(returnedState).toEqual(finalState);
  });

  it('it copies full editor state when COPY_TO_EDITOR action dispatched', () => {
    const newEditorState = {
      emailBody: 'test',
      emailSubject: 'test',
      emailRecipients: ['test'],
    };
    const finalState = {
      ...testState,
      ...newEditorState,
    };
    const returnedState = editorReducer(testState, { type: 'COPY_TO_EDITOR', payload: newEditorState });
    expect(returnedState).toEqual(finalState);
  });
});

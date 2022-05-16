import { initializeMockApp } from '../../../../setupTest';
import BulkEmailReducer from '../reducer';

describe('BulkEmailReducer', () => {
  const testState = {
    editor: {
      emailBody: {},
      emailSubject: '',
      emailRecipient: [],
      emailSchedule: '',
    },
    scheduledEmails: [],
    isLoading: false,
    errorRetrievingData: false,
  };
  beforeAll(async () => {
    await initializeMockApp();
  });

  it('does not change state on FETCH_SCHEDULED_EMAILS', () => {
    expect(BulkEmailReducer(testState, { type: 'FETCH_SCHEDULED_EMAILS' })).toEqual(testState);
  });
  it('sets loading state on FETCH_START', () => {
    const finalState = {
      ...testState,
      isLoading: true,
    };
    const returnedState = BulkEmailReducer(testState, { type: 'FETCH_START' });
    expect(returnedState).toEqual(finalState);
  });
  it('adds payload on FETCH_COMPLETE', () => {
    const finalState = {
      ...testState,
      additionalField: true,
      isLoading: false,
    };
    const returnedState = BulkEmailReducer(testState, { type: 'FETCH_COMPLETE', payload: { additionalField: true } });
    expect(returnedState).toEqual(finalState);
    expect(returnedState.isLoading).toEqual(false);
    expect(returnedState.errorRetrievingData).toEqual(false);
  });
  it('sets Error to true when FETCH_FAILURE action dispatched', () => {
    const finalState = {
      ...testState,
      isLoading: false,
      errorRetrievingData: true,
    };
    const returnedState = BulkEmailReducer(testState, { type: 'FETCH_FAILURE' });
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
      editor: {
        ...newEditorState,
      },
    };
    const returnedState = BulkEmailReducer(testState, { type: 'COPY_TO_EDITOR', payload: newEditorState });
    expect(returnedState).toEqual(finalState);
  });
});

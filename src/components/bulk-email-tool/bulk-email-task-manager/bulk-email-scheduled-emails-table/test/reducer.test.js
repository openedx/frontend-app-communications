import { initializeMockApp } from '../../../../../setupTest';
import { scheduledEmailsTableReducer } from '../data/reducer';

describe('scheduledEmailsTableReducer', () => {
  const testState = {
    scheduledEmails: [],
    isLoading: false,
    errorRetrievingData: false,
  };
  beforeAll(async () => {
    await initializeMockApp();
  });

  it('does not change state on FETCH_SCHEDULED_EMAILS', () => {
    expect(scheduledEmailsTableReducer(testState, { type: 'FETCH_SCHEDULED_EMAILS' })).toEqual(testState);
  });
  it('sets loading state on FETCH_START', () => {
    const finalState = {
      ...testState,
      isLoading: true,
    };
    const returnedState = scheduledEmailsTableReducer(testState, { type: 'FETCH_START' });
    expect(returnedState).toEqual(finalState);
  });
  it('adds payload on FETCH_COMPLETE', () => {
    const finalState = {
      ...testState,
      additionalField: true,
      isLoading: false,
    };
    const returnedState = scheduledEmailsTableReducer(testState, { type: 'FETCH_COMPLETE', payload: { additionalField: true } });
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
    const returnedState = scheduledEmailsTableReducer(testState, { type: 'FETCH_FAILURE' });
    expect(returnedState).toEqual(finalState);
  });
});

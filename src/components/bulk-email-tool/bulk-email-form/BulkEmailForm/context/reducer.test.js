import { reducer, actionCreators, INITIAL_STATE } from './reducer';

describe('BulkEmailForm reducer tests', () => {
  test('should update the form correctly', () => {
    const state = reducer(INITIAL_STATE, actionCreators.updateForm({ emailId: 'example@email.com', newKey: 'test' }));
    expect(state.form.emailId).toBe('example@email.com');
    expect(state.form.newKey).toBe('test');
  });

  test('should reset the form state', () => {
    const { form } = INITIAL_STATE;
    const updatedState = { ...INITIAL_STATE, form: { ...form, emailId: 'example@email.com' } };
    const state = reducer(updatedState, actionCreators.resetForm());
    expect(state).toEqual(INITIAL_STATE);
  });

  test('should update and reset the form state', () => {
    const state = reducer(INITIAL_STATE, actionCreators.updateForm({ emailId: 'example@email.com', newKey: 'test' }));
    expect(state.form.emailId).toBe('example@email.com');
    expect(state.form.newKey).toBe('test');
    const stateRestored = reducer(state, actionCreators.resetForm());
    expect(stateRestored).toEqual(INITIAL_STATE);
    expect(stateRestored.form.newKey).toBeUndefined();
  });
});

import { useMemo, useReducer } from 'react';

/**
 * This helper function wraps the useReducer dispatch function to allow for invoking function calls
 * when a state change is dispatched.
 * @param {Function} dispatch useReducer's dispatch function.
 * @returns a wrapped dispatch that execututes function actions.
 */
export function wrapAsync(dispatch) {
  return (action) => {
    if (typeof action === 'function') {
      return action(dispatch);
    }
    return dispatch(action);
  };
}

/**
 * A utility function to combine reducers. this allows us to organize and create individual reducers
 * for components with its own slice of the store. This function the returns a combined reducer to make
 * dispatching easier amoungst multiple components. This function isnt used directly by this hook, but is a part of
 * the ecosystem around it, and is meant to be used as a step before calling the hook.
 * @param {Object} slices reducer functions to be combined.
 * @returns a single reducer function
*/
export function combineReducers(slices) {
  return (prevState, action) => Object.keys(slices).reduce(
    (nextState, nextProp) => ({
      ...nextState,
      [nextProp]: slices[nextProp](prevState[nextProp], action),
    }),
    prevState,
  );
}

/**
 * By default, the useReducer hook does not allow for async dispatches. This small
 * hook takes the dispatch function from useReducer and wraps it to allow for the execution
 * of functions that are invoked with the dispatch object. This makes it easier for us to perform
 * async operations, or to execute multiple dispatches in a row using a single thunk.
 * @param {Function} reducer a reducer function for the context state.
 * @param {Object} initialState an initial state for the context store.
 * @returns [state, asyncDispatch ]
 */
const useAsyncReducer = (reducer, initialState = null) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const asyncDispatch = useMemo(() => wrapAsync(dispatch), [dispatch]);

  return [state, asyncDispatch];
};

export default useAsyncReducer;

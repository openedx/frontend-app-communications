import contextFactory from '@communications-app/src/utils/contextFactory';

import { INITIAL_STATE, reducer } from './reducer';

export const {
  useSelector,
  withContextProvider,
  useDispatch,
  DispatchContext,
  StateContext,
} = contextFactory(reducer, INITIAL_STATE);

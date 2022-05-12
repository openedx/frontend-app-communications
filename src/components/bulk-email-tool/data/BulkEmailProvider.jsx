import React from 'react';
import PropTypes from 'prop-types';
import useAsyncReducer from '../../../utils/useAsyncReducer';
import BulkEmailReducer from './reducer';

export const BulkEmailContext = React.createContext();

export function BulkEmailProvider({ children }) {
  const initialState = {
    editor: {
      emailBody: {},
      emailSubject: '',
      emailRecipient: [],
      emailSchedule: '',
    },
    scheduledEmails: [],
  };
  const [state, dispatch] = useAsyncReducer(BulkEmailReducer, initialState);
  return <BulkEmailContext.Provider value={[state, dispatch]}>{children}</BulkEmailContext.Provider>;
}

BulkEmailProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

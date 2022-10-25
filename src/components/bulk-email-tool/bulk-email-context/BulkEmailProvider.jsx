import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useAsyncReducer, { combineReducers } from '../../../utils/useAsyncReducer';
import editor, { editorInitialState } from '../bulk-email-form/data/reducer';
import scheduledEmailsTable, {
  scheduledEmailsTableInitialState,
} from '../bulk-email-task-manager/bulk-email-scheduled-emails-table/data/reducer';

export const BulkEmailContext = React.createContext();

const BulkEmailProvider = ({ children }) => {
  const initialState = {
    editor: editorInitialState,
    scheduledEmailsTable: scheduledEmailsTableInitialState,
  };
  const [state, dispatch] = useAsyncReducer(
    combineReducers({ editor, scheduledEmailsTable }),
    initialState,
  );

  const contextValue = useMemo(() => ([state, dispatch]), [dispatch, state]);

  return <BulkEmailContext.Provider value={contextValue}>{children}</BulkEmailContext.Provider>;
};

BulkEmailProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default BulkEmailProvider;

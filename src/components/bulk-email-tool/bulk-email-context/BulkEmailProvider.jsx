import {
  createContext, useContext, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';

export const editorInitialState = {
  emailBody: '',
  emailSubject: '',
  scheduleDate: '',
  scheduleTime: '',
  emailRecipients: [],
  editMode: false,
  schedulingId: '',
  emailId: null,
};

export const BulkEmailContext = createContext(null);

export default function BulkEmailProvider({ children }) {
  const [editor, setEditor] = useState(editorInitialState);

  const editorActions = useMemo(() => ({
    updateEditor: (fields) => setEditor((prev) => ({ ...prev, ...fields })),
    copyToEditor: (email) => setEditor({ ...editorInitialState, ...email }),
    clearEditor: () => setEditor(editorInitialState),
  }), []);

  const value = useMemo(() => ({ editor, ...editorActions }), [editor, editorActions]);

  return <BulkEmailContext.Provider value={value}>{children}</BulkEmailContext.Provider>;
}

BulkEmailProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export const useBulkEmailEditor = () => {
  const context = useContext(BulkEmailContext);
  if (!context) {
    throw new Error('useBulkEmailEditor must be used within a BulkEmailProvider');
  }
  return context;
};

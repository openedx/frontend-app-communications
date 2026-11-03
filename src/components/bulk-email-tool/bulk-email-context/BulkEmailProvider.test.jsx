import { act, renderHook } from '@testing-library/react';
import BulkEmailProvider, { editorInitialState, useBulkEmailEditor } from './BulkEmailProvider';

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => <BulkEmailProvider>{children}</BulkEmailProvider>;

describe('useBulkEmailEditor', () => {
  it('starts with the initial editor state', () => {
    const { result } = renderHook(() => useBulkEmailEditor(), { wrapper });
    expect(result.current.editor).toEqual(editorInitialState);
  });

  it('merges fields without removing existing data on updateEditor', () => {
    const { result } = renderHook(() => useBulkEmailEditor(), { wrapper });
    act(() => result.current.updateEditor({ emailSubject: 'subject' }));
    act(() => result.current.updateEditor({ emailBody: 'body' }));
    expect(result.current.editor).toEqual({ ...editorInitialState, emailSubject: 'subject', emailBody: 'body' });
  });

  it('replaces the editor content on copyToEditor', () => {
    const { result } = renderHook(() => useBulkEmailEditor(), { wrapper });
    act(() => result.current.updateEditor({ emailRecipients: ['myself'], scheduleDate: '2030-01-01' }));
    act(() => result.current.copyToEditor({ emailBody: 'body', emailSubject: 'subject' }));
    expect(result.current.editor).toEqual({ ...editorInitialState, emailBody: 'body', emailSubject: 'subject' });
  });

  it('resets the editor on clearEditor', () => {
    const { result } = renderHook(() => useBulkEmailEditor(), { wrapper });
    act(() => result.current.updateEditor({ emailSubject: 'subject', editMode: true }));
    act(() => result.current.clearEditor());
    expect(result.current.editor).toEqual(editorInitialState);
  });

  it('throws when used outside a BulkEmailProvider', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useBulkEmailEditor())).toThrow(
      'useBulkEmailEditor must be used within a BulkEmailProvider',
    );
    console.error.mockRestore(); // eslint-disable-line no-console
  });
});

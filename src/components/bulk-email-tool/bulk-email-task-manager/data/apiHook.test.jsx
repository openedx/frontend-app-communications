import { renderHook, waitFor } from '@testing-library/react';
import { createQueryWrapper } from '../../../../setupTest';
import { useEmailTaskHistory, usePendingInstructorTasks, useSentEmailHistory } from './apiHook';
import { getEmailTaskHistory, getInstructorTasks, getSentEmailHistory } from './api';

jest.mock('./api');

describe('bulk-email-task-manager api hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useSentEmailHistory', () => {
    it('fetches sent email history', async () => {
      const mockData = { emails: [{ id: 1 }] };
      getSentEmailHistory.mockResolvedValue(mockData);

      const { result } = renderHook(() => useSentEmailHistory('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(getSentEmailHistory).toHaveBeenCalledWith('test-course-id');
      expect(result.current.data).toEqual(mockData);
    });

    it('does not fetch when disabled', () => {
      const { result } = renderHook(() => useSentEmailHistory('test-course-id', { enabled: false }), {
        wrapper: createQueryWrapper(),
      });

      expect(result.current.fetchStatus).toBe('idle');
      expect(getSentEmailHistory).not.toHaveBeenCalled();
    });

    it('handles API error', async () => {
      const error = new Error('API Error');
      getSentEmailHistory.mockRejectedValue(error);

      const { result } = renderHook(() => useSentEmailHistory('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error).toBe(error);
    });
  });

  describe('useEmailTaskHistory', () => {
    it('fetches email task history', async () => {
      const mockData = { tasks: [{ task_id: '1' }] };
      getEmailTaskHistory.mockResolvedValue(mockData);

      const { result } = renderHook(() => useEmailTaskHistory('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(getEmailTaskHistory).toHaveBeenCalledWith('test-course-id');
      expect(result.current.data).toEqual(mockData);
    });

    it('does not fetch when disabled', () => {
      const { result } = renderHook(() => useEmailTaskHistory('test-course-id', { enabled: false }), {
        wrapper: createQueryWrapper(),
      });

      expect(result.current.fetchStatus).toBe('idle');
      expect(getEmailTaskHistory).not.toHaveBeenCalled();
    });
  });

  describe('usePendingInstructorTasks', () => {
    it('fetches pending instructor tasks', async () => {
      const mockData = { tasks: [{ task_id: '1' }] };
      getInstructorTasks.mockResolvedValue(mockData);

      const { result } = renderHook(() => usePendingInstructorTasks('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(getInstructorTasks).toHaveBeenCalledWith('test-course-id');
      expect(result.current.data).toEqual(mockData);
    });

    it('handles API error', async () => {
      getInstructorTasks.mockRejectedValue(new Error('API Error'));

      const { result } = renderHook(() => usePendingInstructorTasks('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
    });
  });
});

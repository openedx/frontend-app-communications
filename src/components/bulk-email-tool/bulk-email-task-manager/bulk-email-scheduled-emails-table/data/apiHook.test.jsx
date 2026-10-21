import { renderHook, waitFor, act } from '@testing-library/react';
import { createQueryWrapper } from '../../../../../setupTest';
import { useDeleteScheduledEmail, useScheduledEmails } from './apiHook';
import { deleteScheduledBulkEmailInstructorTask, getScheduledBulkEmailIntructorTaskData } from './api';

jest.mock('./api');

const mockScheduledEmails = {
  count: 1,
  numPages: 1,
  currentPage: 1,
  results: [{ id: 1 }],
};

describe('scheduled emails api hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useScheduledEmails', () => {
    it('fetches the requested page of scheduled emails', async () => {
      getScheduledBulkEmailIntructorTaskData.mockResolvedValue(mockScheduledEmails);

      const { result } = renderHook(() => useScheduledEmails('test-course-id', 2), {
        wrapper: createQueryWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(getScheduledBulkEmailIntructorTaskData).toHaveBeenCalledWith('test-course-id', 2);
      expect(result.current.data).toEqual(mockScheduledEmails);
    });

    it('handles API error', async () => {
      const error = new Error('API Error');
      getScheduledBulkEmailIntructorTaskData.mockRejectedValue(error);

      const { result } = renderHook(() => useScheduledEmails('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error).toBe(error);
    });

    it('does not fetch when courseId is missing', () => {
      const { result } = renderHook(() => useScheduledEmails(undefined), {
        wrapper: createQueryWrapper(),
      });

      expect(result.current.fetchStatus).toBe('idle');
      expect(getScheduledBulkEmailIntructorTaskData).not.toHaveBeenCalled();
    });
  });

  describe('useDeleteScheduledEmail', () => {
    it('deletes the scheduled email', async () => {
      deleteScheduledBulkEmailInstructorTask.mockResolvedValue(204);

      const { result } = renderHook(() => useDeleteScheduledEmail('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      act(() => result.current.mutate(1));

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(deleteScheduledBulkEmailInstructorTask).toHaveBeenCalledWith('test-course-id', 1);
    });

    it('handles API error', async () => {
      deleteScheduledBulkEmailInstructorTask.mockRejectedValue(new Error('API Error'));

      const { result } = renderHook(() => useDeleteScheduledEmail('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      act(() => result.current.mutate(1));

      await waitFor(() => expect(result.current.isError).toBe(true));
    });
  });
});

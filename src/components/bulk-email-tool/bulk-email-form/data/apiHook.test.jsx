import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { createQueryWrapper } from '@src/setupTest';
import { scheduledEmailsQueryKeys } from '@src/components/bulk-email-tool/bulk-email-task-manager/bulk-email-scheduled-emails-table/data/queryKeys';
import { instructorTasksQueryKeys } from '@src/components/bulk-email-tool/bulk-email-task-manager/data/queryKeys';
import { useEditScheduledEmail, usePostBulkEmail } from './apiHook';
import { patchScheduledBulkEmailInstructorTask, postBulkEmailInstructorTask } from './api';

jest.mock('./api');

describe('bulk-email-form api hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('usePostBulkEmail', () => {
    it('posts the email for the course', async () => {
      postBulkEmailInstructorTask.mockResolvedValue({ status: 200 });
      const emailData = new FormData();

      const { result } = renderHook(() => usePostBulkEmail('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      act(() => result.current.mutate(emailData));

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(postBulkEmailInstructorTask).toHaveBeenCalledWith(emailData, 'test-course-id');
    });

    it('invalidates scheduled emails and instructor tasks on success', async () => {
      postBulkEmailInstructorTask.mockResolvedValue({ status: 200 });
      const invalidateSpy = jest.spyOn(QueryClient.prototype, 'invalidateQueries');

      const { result } = renderHook(() => usePostBulkEmail('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      act(() => result.current.mutate(new FormData()));

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: scheduledEmailsQueryKeys.byCourse('test-course-id') });
      expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: instructorTasksQueryKeys.byCourse('test-course-id') });
      invalidateSpy.mockRestore();
    });

    it('handles API error', async () => {
      postBulkEmailInstructorTask.mockRejectedValue(new Error('API Error'));

      const { result } = renderHook(() => usePostBulkEmail('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      act(() => result.current.mutate(new FormData()));

      await waitFor(() => expect(result.current.isError).toBe(true));
    });
  });

  describe('useEditScheduledEmail', () => {
    it('patches the scheduled email', async () => {
      patchScheduledBulkEmailInstructorTask.mockResolvedValue({ status: 200 });
      const emailData = { email: { subject: 'test' }, schedule: null };

      const { result } = renderHook(() => useEditScheduledEmail('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      act(() => result.current.mutate({ emailData, schedulingId: 1 }));

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(patchScheduledBulkEmailInstructorTask).toHaveBeenCalledWith(emailData, 'test-course-id', 1);
    });

    it('handles API error', async () => {
      patchScheduledBulkEmailInstructorTask.mockRejectedValue(new Error('API Error'));

      const { result } = renderHook(() => useEditScheduledEmail('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      act(() => result.current.mutate({ emailData: {}, schedulingId: 1 }));

      await waitFor(() => expect(result.current.isError).toBe(true));
    });
  });
});

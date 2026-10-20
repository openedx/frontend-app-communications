import { renderHook, waitFor, act } from '@testing-library/react';
import { createQueryWrapper } from '../../../../setupTest';
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

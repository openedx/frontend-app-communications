import { useMutation, useQueryClient } from '@tanstack/react-query';
import { scheduledEmailsQueryKeys } from '@src/components/bulk-email-tool/bulk-email-task-manager/bulk-email-scheduled-emails-table/data/queryKeys';
import { instructorTasksQueryKeys } from '@src/components/bulk-email-tool/bulk-email-task-manager/data/queryKeys';
import { patchScheduledBulkEmailInstructorTask, postBulkEmailInstructorTask } from './api';

export const usePostBulkEmail = (courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (emailData) => postBulkEmailInstructorTask(emailData, courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduledEmailsQueryKeys.byCourse(courseId) });
      queryClient.invalidateQueries({ queryKey: instructorTasksQueryKeys.byCourse(courseId) });
    },
  });
};

export const useEditScheduledEmail = (courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ emailData, schedulingId }) => (
      patchScheduledBulkEmailInstructorTask(emailData, courseId, schedulingId)
    ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduledEmailsQueryKeys.byCourse(courseId) });
      queryClient.invalidateQueries({ queryKey: instructorTasksQueryKeys.byCourse(courseId) });
    },
  });
};

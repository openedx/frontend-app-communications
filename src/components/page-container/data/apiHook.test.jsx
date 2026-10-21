import { renderHook, waitFor } from '@testing-library/react';
import { Factory } from 'rosie';
import { createQueryWrapper } from '../../../setupTest';
import { useCohorts, useCourseMetadata } from './apiHook';
import { getCohorts, getCourseHomeCourseMetadata } from './api';
import './__factories__/cohort.factory';
import './__factories__/courseMetadata.factory';

jest.mock('./api');

describe('page-container api hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useCourseMetadata', () => {
    it('fetches course metadata successfully', async () => {
      const courseMetadata = Factory.build('courseMetadata');
      getCourseHomeCourseMetadata.mockResolvedValue(courseMetadata);

      const { result } = renderHook(() => useCourseMetadata('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(getCourseHomeCourseMetadata).toHaveBeenCalledWith('test-course-id');
      expect(result.current.data).toEqual(courseMetadata);
    });

    it('handles API error', async () => {
      const error = new Error('API Error');
      getCourseHomeCourseMetadata.mockRejectedValue(error);

      const { result } = renderHook(() => useCourseMetadata('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error).toBe(error);
      expect(result.current.data).toBeUndefined();
    });

    it('does not fetch when courseId is missing', () => {
      const { result } = renderHook(() => useCourseMetadata(undefined), {
        wrapper: createQueryWrapper(),
      });

      expect(result.current.fetchStatus).toBe('idle');
      expect(getCourseHomeCourseMetadata).not.toHaveBeenCalled();
    });
  });

  describe('useCohorts', () => {
    it('fetches cohorts successfully', async () => {
      const cohorts = { cohorts: [Factory.build('cohort'), Factory.build('cohort')] };
      getCohorts.mockResolvedValue(cohorts);

      const { result } = renderHook(() => useCohorts('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(getCohorts).toHaveBeenCalledWith('test-course-id');
      expect(result.current.data).toEqual(cohorts);
    });

    it('handles API error', async () => {
      const error = new Error('API Error');
      getCohorts.mockRejectedValue(error);

      const { result } = renderHook(() => useCohorts('test-course-id'), {
        wrapper: createQueryWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(result.current.error).toBe(error);
    });

    it('does not fetch when courseId is missing', () => {
      const { result } = renderHook(() => useCohorts(undefined), {
        wrapper: createQueryWrapper(),
      });

      expect(result.current.fetchStatus).toBe('idle');
      expect(getCohorts).not.toHaveBeenCalled();
    });
  });
});

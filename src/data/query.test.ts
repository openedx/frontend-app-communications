import { useQuery } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';

import { communicationsQueryOptions, useCommunicationsQuery } from './query';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

const useQueryMock = useQuery as jest.Mock;

describe('useCommunicationsQuery', () => {
  const queryFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('applies the communications options to the query', () => {
    renderHook(() => useCommunicationsQuery({ queryKey: ['test'], queryFn }));
    expect(useQueryMock).toHaveBeenCalledWith({
      ...communicationsQueryOptions,
      queryKey: ['test'],
      queryFn,
    });
  });

  it('lets the caller override them', () => {
    renderHook(() => useCommunicationsQuery({ queryKey: ['test'], queryFn, refetchOnWindowFocus: true }));
    expect(useQueryMock).toHaveBeenCalledWith(expect.objectContaining({ refetchOnWindowFocus: true }));
  });
});

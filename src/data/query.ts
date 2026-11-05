import {
  DefaultError, QueryKey, useQuery, UseQueryOptions, UseQueryResult,
} from '@tanstack/react-query';

export const communicationsQueryOptions = {
  refetchOnWindowFocus: false,
} as const;

/**
 * These can't be defaults on a QueryClient: the shell's client is shared by every
 * app on the site, so app-wide defaults would leak into other apps. A query that
 * skips this wrapper falls back to stock React Query behavior.
 */
export function useCommunicationsQuery<
  TQueryFnData,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): UseQueryResult<TData, TError> {
  return useQuery<TQueryFnData, TError, TData, TQueryKey>({ ...communicationsQueryOptions, ...options });
}

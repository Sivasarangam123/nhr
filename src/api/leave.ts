
import useSWR, { mutate } from 'swr';

import { useMemo } from 'react';

// utils
import axios, { fetcher, endpoints } from 'src/utils/axios';
// types
import { ILeaveItem } from 'src/types/leave';

// ----------------------------------------------------------------------
export function useGetLeaves() {
  const URL = endpoints.leave.list;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  console.log("data",data)
  const memoizedValue = useMemo(
    () => ({
      leaves: (data as ILeaveItem[]) || [],
      leavesLoading: isLoading,
      leavesError: error,
      leavesValidating: isValidating,
      leavesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]

  );
  return memoizedValue;

}
// ----------------------------------------------------------------------
export function useGetLeave(leaveId: string) {

  const URL = leaveId ? [endpoints.leave.details, { params: { leaveId } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(

    () => ({

      leave: data?.leave as ILeaveItem,

      leaveLoading: isLoading,

      leaveError: error,

      leaveValidating: isValidating,

    }),

    [data?.leave, error, isLoading, isValidating]

  );
  return memoizedValue;

}


// ----------------------------------------------------------------------
export function useSearchProducts(query: string) {

  const URL = query ? [endpoints.leave.search, { params: { query } }] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {

    keepPreviousData: true,

  });
  const memoizedValue = useMemo(

    () => ({

      searchResults: (data?.results as ILeaveItem[]) || [],

      searchLoading: isLoading,

      searchError: error,

      searchValidating: isValidating,

      searchEmpty: !isLoading && !data?.results.length,

    }),

    [data?.results, error, isLoading, isValidating]

  );
  return memoizedValue;

}


export async function newCreateLeave(newLeave: ILeaveItem) {
  const response = await axios.post(endpoints.leave.list, newLeave);

  mutate(

    endpoints.leave.list,

    (currentData: any) => [...currentData, response.data], // assuming response.data contains the new asset

    false // This means don't re-fetch the data after the mutation

  );

}




// ... previous imports ...




// Update an asset

export async function updateLeave(leaveId: string, updatedLeave: ILeaveItem) {

  const response = await axios.put(endpoints.leave.edit(leaveId), updatedLeave);
  // Optimistically update the cache
  mutate(endpoints.leave.edit(leaveId), { ...updatedLeave, id: leaveId }, false);

  return response;

}



export async function deleteLeave(leaveId: string) {
  const response = await axios.delete(endpoints.leave.delete(leaveId));
  // Optimistically remove the asset from the list

  mutate(
    endpoints.leave.list,

    (currentData: any) => currentData.filter((leave: ILeaveItem) => leave.id !== leaveId),

    false

  );

  return response;

}



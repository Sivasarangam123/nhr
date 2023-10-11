
import useSWR, { mutate } from 'swr';

import { useMemo } from 'react';

// utils
import axios, { fetcher, endpoints } from 'src/utils/axios';
import { IEducationItem } from 'src/types/education';
// types
// ----------------------------------------------------------------------
export function useGetEducations() {
  const URL = endpoints.education.list;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  console.log("data",data)
  const memoizedValue = useMemo(
    () => ({
      educations: (data as IEducationItem[]) || [],
      educationsLoading: isLoading,
      educationsError: error,
      eductionsValidating: isValidating,
      educationsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]

  );
  return memoizedValue;

}
// ----------------------------------------------------------------------
export function useGetEducation(educationId: string) {

  const URL = educationId ? [endpoints.education.details, { params: { educationId } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(

    () => ({

      education: data?.education as IEducationItem,

      educationLoading: isLoading,

      educationError: error,

      educationValidating: isValidating,

    }),

    [data?.education, error, isLoading, isValidating]

  );
  return memoizedValue;

}


// ----------------------------------------------------------------------
export function useSearchProducts(query: string) {

  const URL = query ? [endpoints.education.search, { params: { query } }] : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {

    keepPreviousData: true,

  });
  const memoizedValue = useMemo(

    () => ({

      searchResults: (data?.results as IEducationItem[]) || [],

      searchLoading: isLoading,

      searchError: error,

      searchValidating: isValidating,

      searchEmpty: !isLoading && !data?.results.length,

    }),

    [data?.results, error, isLoading, isValidating]

  );
  return memoizedValue;

}


export async function newCreateEducation(newEducation: IEducationItem) {
  const response = await axios.post(endpoints.education.list, newEducation);

  mutate(

    endpoints.education.list,

    (currentData: any) => [...currentData, response.data], // assuming response.data contains the new asset

    false // This means don't re-fetch the data after the mutation

  );

}



// Update an asset

export async function updateEducation(educationId: string, updatedEducation: IEducationItem) {

  const response = await axios.put(endpoints.education.edit(educationId), updatedEducation);
  // Optimistically update the cache
  mutate(endpoints.education.edit(educationId), { ...updatedEducation, id: educationId }, false);

  return response;

}




// Delete an asset

export async function deleteEducation(educationId: string) {
  const response = await axios.delete(endpoints.education.delete(educationId));
  // Optimistically remove the asset from the list

  mutate(
    endpoints.education.list,

    (currentData: any) => currentData.filter((education: IEducationItem) => education.id !== educationId),

    false

  );

  return response;

}



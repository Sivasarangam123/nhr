import useSWR, { mutate } from 'swr';

import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios';

// types

import { IAssetItem } from 'src/types/asset';

// ----------------------------------------------------------------------

export function useGetAssets() {

  const URL = endpoints.asset.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  console.log("data",data)

  const memoizedValue = useMemo(

    () => ({

      assets: (data as IAssetItem[]) || [],

      assetsLoading: isLoading,

      assetsError: error,

      assetsValidating: isValidating,

      assetsEmpty: !isLoading && !data?.length,

    }),

    [data, error, isLoading, isValidating]

 

  );

  return memoizedValue;

 

}

// ----------------------------------------------------------------------

export function useGetAsset(assetId: string) {

 

  const URL = assetId ? [endpoints.asset.details, { params: { assetId } }] : null;

 

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

 

  const memoizedValue = useMemo(

 

    () => ({

 

      asset: data?.asset as IAssetItem,

 

      assetLoading: isLoading,

 

      assetError: error,

 

      assetValidating: isValidating,

 

    }),

 

    [data?.asset, error, isLoading, isValidating]

 

  );

  return memoizedValue;

 

}

 

 

// ----------------------------------------------------------------------

export function useSearchProducts(query: string) {

 

  const URL = query ? [endpoints.asset.search, { params: { query } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {

 

    keepPreviousData: true,

 

  });

  const memoizedValue = useMemo(

 

    () => ({

 

      searchResults: (data?.results as IAssetItem[]) || [],

 

      searchLoading: isLoading,

 

      searchError: error,

 

      searchValidating: isValidating,

 

      searchEmpty: !isLoading && !data?.results.length,

 

    }),

 

    [data?.results, error, isLoading, isValidating]

 

  );

  return memoizedValue;

 

}

 

 

export  function newCreateAsset(newAsset: IAssetItem) {

  return new Promise ( (resolve) => {

 

  const response:any =  axios.post(endpoints.asset.list, newAsset);

  // Mutate the asset list cache after successfully creating a new asset

 

   mutate(

 

    endpoints.asset.list,

 

    (currentData: any) => [...currentData, response?.data], // assuming response.data contains the new asset

 

    false // This means don't re-fetch the data after the mutation

 

  );

   resolve(response?.data)

  })

 

}

 

 

// Update an asset

 

export async function updateAsset(assetId: string, updatedAsset: IAssetItem) {

return new Promise( (resolve) => {

  const response:any =  axios.put(endpoints.asset.edit(assetId), updatedAsset);

  // Optimistically update the cache

  mutate(endpoints.asset.edit(assetId), { ...updatedAsset, id: assetId }, false);

 

  resolve(response);

})

}

 

 

// Delete an asset

 

export async function deleteAsset(assetId: string) {

  const response = await axios.delete(endpoints.asset.delete(assetId));

  // Optimistically remove the asset from the list

 

  mutate(

    endpoints.asset.list,

 

    (currentData: any) => currentData.filter((asset: IAssetItem) => asset.id !== assetId),

 

    false

 

  );

 

  return response;

 

}

 
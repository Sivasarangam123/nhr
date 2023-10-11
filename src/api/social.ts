import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import axios, { fetcher, endpoints } from 'src/utils/axios';
import { IUserSocialLink } from 'src/types/user';

const URL = endpoints.social; // Define the endpoint for social links

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetSocialLinks() {
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  const memoizedValue = useMemo(
    () => ({
      socialLinks: data?.socialLinks || [],
      socialLinksLoading: isLoading,
      socialLinksError: error,
      socialLinksValidating: isValidating,
      socialLinksEmpty: !isLoading && !data?.socialLinks.length,
    }),
    [data?.socialLinks, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createSocialLink(socialLinkData: IUserSocialLink) {
  // Work on server
  const data = { socialLinkData };
  await axios.post(URL, data);

  // Work in local
  mutate(
    URL,
    (currentData: any) => ({
      ...currentData,
      socialLinks: [...currentData.socialLinks, socialLinkData],
    }),
    false
  );
}

export async function updateSocialLink(
  socialId: string,
  socialLinkData: Partial<IUserSocialLink>,
  userId: string
) {
  // Work on server

  await axios.put(`${URL}/${socialId}?userId=${userId}`, socialLinkData);

  // Work in local
  mutate(
    URL,
    (currentData: any) => ({
      ...currentData,
      socialLinks: currentData.socialLinks.map((link: IUserSocialLink) =>
        link.id === socialLinkData.id ? { ...link, ...socialLinkData } : link
      ),
    }),
    false
  );
}

export async function deleteSocialLink(socialLinkId: string) {
  // Work on server
  // const data = { socialLinkId };
  // await axios.patch(URL, data);

  // Work in local
  mutate(
    URL,
    (currentData: any) => ({
      ...currentData,
      socialLinks: currentData.socialLinks.filter(
        (link: IUserSocialLink) => link.id !== socialLinkId
      ),
    }),
    false
  );
}

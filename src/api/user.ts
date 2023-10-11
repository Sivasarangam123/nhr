import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
// utils
import axios, { fetcher, endpoints } from 'src/utils/axios';
// types
import { IUserCreateItem, IUserItem, IUserUpdateItem } from 'src/types/user';

// ----------------------------------------------------------------------

// Get users
export function useGetUsers() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.user.list, fetcher);

  const memoizedValue = useMemo(() => {
    const users = data?.users.map((user: IUserItem) => ({
      ...user,
    }));

    return {
      users: (users as IUserItem[]) || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && !data?.users.length,
    };
  }, [data?.users, error, isLoading, isValidating]);

  return memoizedValue;
}

// Get users
export function useGetTeamUsers() {
  const { data, isLoading, error, isValidating } = useSWR(`${endpoints.user.list}teams`, fetcher);

  const memoizedValue = useMemo(() => {
    const users = data?.users.map((user: IUserItem) => ({
      ...user,
    }));

    return {
      users: (users as IUserItem[]) || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && !data?.users.length,
    };
  }, [data?.users, error, isLoading, isValidating]);

  return memoizedValue;
}

// Update user
export async function updateUser(userId: string, updatedUser: IUserUpdateItem) {
  const formData = new FormData();
  formData.append(
    'createUpdateUserDto',
    new Blob([JSON.stringify(updatedUser)], {
      type: 'application/json',
    })
  );
  // Check if avatarUrl is not empty
  if (updatedUser.avatarUrl) {
    formData.append('file', updatedUser.avatarUrl);
  }

  const response = await axios.put(`${endpoints.user.details}/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  /**
   * Work in local
   */
  mutate(
    endpoints.user.list,
    (currentData: any) => {
      const users: IUserItem[] = currentData.users.map((user: IUserItem) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      );

      return {
        ...currentData,
        users,
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export function useGetUser(userId: string) {
  const URL = userId ? `${endpoints.user.details}/${userId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      user: data?.user as IUserItem,
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
    }),
    [data?.user, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProducts(query: string) {
  const URL = query ? [endpoints.user.search, { params: { query } }] : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: (data?.results as IUserItem[]) || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createUser(newUser: IUserCreateItem) {
  const formData = new FormData();
  formData.append(
    'createUpdateUserDto',
    new Blob([JSON.stringify(newUser)], {
      type: 'application/json',
    })
  );
  formData.append('file', newUser.avatarUrl);

  const response = await axios.post(endpoints.user.new, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // Mutate the user list cache after successfully creating a new user
  mutate(
    endpoints.user.list,
    (currentData: any) => [...currentData, response.data], // assuming response.data contains the new user
    false // This means don't re-fetch the data after the mutation
  );
}

// Delete user
export async function deleteUser(userId: string) {
  await axios.delete(`${endpoints.user.details}/${userId}`);

  // Mutate the user list cache after successfully deleting a user
  mutate(
    endpoints.user.list,
    (currentData: any) => currentData.filter((user: IUserItem) => user.id !== userId), // remove the deleted user from the cache
    false // This means don't re-fetch the data after the mutation
  );
}

import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';
// utils
import axios, { fetcher } from 'src/utils/axios';
// types
import { NotificationGroup, NotificationItem } from 'src/types/notification';

// ----------------------------------------------------------------------

// Get notification groups
export function useGetNotificationGroups() {
  const { data, isLoading, error, isValidating } = useSWR('/api/notifications/groups', fetcher);
  console.log(data);
  const memoizedValue = useMemo(
    () => ({
      notificationGroups: (data as NotificationGroup[]) || [],
      notificationGroupsLoading: isLoading,
      notificationGroupsError: error,
      notificationGroupsValidating: isValidating,
      notificationGroupsEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// Update notification group
export async function updateNotificationGroup(groupId: string, updatedGroup: NotificationGroup) {
  const response = await axios.put(`/api/notificationGroups/${groupId}`, updatedGroup);

  /**
   * Work in local
   */
  mutate(
    '/api/notificationGroups',
    (currentData: any) => {
      const notificationGroups: NotificationGroup[] = currentData.notificationGroups.map(
        (group: NotificationGroup) =>
          group.id === updatedGroup.id ? { ...group, ...updatedGroup } : group
      );

      return {
        ...currentData,
        notificationGroups,
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export function useGetNotificationGroup(groupId: string) {
  const URL = groupId ? `/api/notificationGroups/${groupId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      notificationGroup: data?.notificationGroup as NotificationGroup,
      notificationGroupLoading: isLoading,
      notificationGroupError: error,
      notificationGroupValidating: isValidating,
    }),
    [data?.notificationGroup, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createNotificationGroup(newGroup: NotificationGroup) {
  const response = await axios.post('/api/notificationGroups', newGroup);

  // Mutate the notification group list cache after successfully creating a new group
  mutate(
    '/api/notificationGroups',
    (currentData: any) => [...currentData, response.data], // assuming response.data contains the new group
    false // This means don't re-fetch the data after the mutation
  );
}

// Delete notification group
export async function deleteNotificationGroup(groupId: string) {
  await axios.delete(`/api/notificationGroups/${groupId}`);

  // Mutate the notification group list cache after successfully deleting a group
  mutate(
    '/api/notificationGroups',
    (currentData: any) => currentData.filter((group: NotificationGroup) => group.id !== groupId), // remove the deleted group from the cache
    false // This means don't re-fetch the data after the mutation
  );
}

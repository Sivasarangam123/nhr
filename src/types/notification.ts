export type NotificationItem = {
  id: string;
  label: string;
  groupId: number;
};

export type NotificationGroup = {
  id: string;
  subheader: string;
  caption: string;
  items: NotificationItem[];
};

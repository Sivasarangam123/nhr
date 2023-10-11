import { CustomFile } from 'src/components/upload';
import { IUserItem } from './user';

// ----------------------------------------------------------------------

export type ILeaveTableFilterValue = string | string[];

export type ILeaveTableFilters = {
  employeeName: string;
  reason: string[];
  status: string;
};

export type ILeaveItem = {
  id: string;
  user?: IUserItem;
  fromDate: Date;
  reason: string;
  toDate: Date;
  numberOfDays: string;
  status?: string;
  comment: string;
};

export type ILeaveCreateItem = {
  id: string;
  user: IUserItem;

  fromDate: Date;
  reason: string;
  toDate: Date;
  numberOfDays: string;
  status?: string;
  comment: string;
};

export type ILeaveUpdateItem = {
  id: string;
  user: IUserItem;

  fromDate: Date;
  reason: string;
  toDate: Date;
  numberOfDays: string;
  status?: string;
  comment: string;
};

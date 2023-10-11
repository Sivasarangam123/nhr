import { CustomFile } from 'src/components/upload';

// ----------------------------------------------------------------------

export type IUserTableFilterValue = string | string[];

export type IUserTableFilters = {
  firstName: string;
  role: string[];
  status: string;
};

// ----------------------------------------------------------------------

export type IUserSocialLink = {
  id: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  userId: string;
};

export type IUserProfileCover = {
  name: string;
  role: string;
  coverUrl: string;
  avatarUrl: string;
};

export type IUserProfile = {
  id: string;
  role: string;
  quote: string;
  email: string;
  school: string;
  country: string;
  company: string;
  totalFollowers: number;
  totalFollowing: number;
  socialLinks: IUserSocialLink;
};

export type IUserProfileFollower = {
  id: string;
  name: string;
  country: string;
  avatarUrl: string;
};

export type IUserProfileGallery = {
  id: string;
  title: string;
  imageUrl: string;
  postedAt: Date;
};

export type IUserProfileFriend = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
};

export type IUserProfilePost = {
  id: string;
  media: string;
  message: string;
  createdAt: Date;
  personLikes: {
    name: string;
    avatarUrl: string;
  }[];
  comments: {
    id: string;
    message: string;
    createdAt: Date;
    author: {
      id: string;
      name: string;
      avatarUrl: string;
    };
  }[];
};

export type IUserCard = {
  id: string;
  name: string;
  role: string;
  coverUrl: string;
  avatarUrl: string;
  totalPosts: number;
  totalFollowers: number;
  totalFollowing: number;
};

export type IUserItem = {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  role: string;
  email: string;
  state: string;
  status?: string;
  address: string;
  country: string;
  zipCode: string;
  company: string;
  avatarUrl: string;
  coverUrl?: string;
  phoneNumber: string;
  isVerified: boolean;
  disabled: boolean;
  organizationId: string;
  organization?: Organization;
  socialId?: string;
  socialLinks?: IUserSocialLink;
  about?: string;
  totalFollowers: number;
  totalFollowing: number;
  team: string;
};

export type IUserCreateItem = {
  firstName: string;
  lastName: string;
  city: string;
  role: string;
  email: string;
  state: string;
  status?: string;
  address: string;
  country: string;
  zipCode: string;
  company: string;
  avatarUrl: string;
  phoneNumber: string;
  isVerified: boolean;
  disabled: boolean;
  about?: string;
  team?: string;
};

export type IUserUpdateItem = {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  role: string;
  email: string;
  state: string;
  status?: string;
  address: string;
  country: string;
  zipCode: string;
  company: string;
  avatarUrl: string;
  phoneNumber: string;
  isVerified: boolean;
  disabled: boolean;
  organizationId: string;
  about?: string;
  team?: string;
};

export type IUserAccount = {
  email: string;
  isPublic: boolean;
  displayName: string;
  city: string | null;
  state: string | null;
  about: string | null;
  country: string | null;
  address: string | null;
  zipCode: string | null;
  phoneNumber: string | null;
  photoURL: CustomFile | string | null;
};

export type IUserAccountBillingHistory = {
  id: string;
  price: number;
  createdAt: Date;
  invoiceNumber: string;
};

export type IUserAccountChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type UserState = {
  loadingStatus: string;
  createStatus: string;
  updateStatus: string;
  statusChangeStatus: string;
  error: boolean;
  errorMessage: string | null;
  users: IUserItem[];
  user: IUserItem | null;
  sortBy: string | null;
  filters: {
    url: string;
  };
};

export type Country = {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
  states: string[];
};

export type Organization = {
  id: string;
  createdDateTime: string | null;
  lastUpdatedDateTime: string | null;
  name: string;
  description: string;
  domain: string;
  disabled: boolean;
  logoImgSrc: string | null;
};

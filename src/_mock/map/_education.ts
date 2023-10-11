import { countries } from 'src/assets/data';
//
// import { _mock } from './_mock';
import { _mock } from '../_mock';
// ----------------------------------------------------------------------

export const EDUCATION_STATUS_OPTIONS = [
    { value: 'approved', label: 'approved' },
    { value: 'pending', label: 'pending' },
    { value: 'rejected', label: 'rejected' },
];


export const GPA = [
  { value: '100', label: '100' },
  { value: '90', label: '90' },
  { value: '85', label: '85' },
  { value: '80', label: '80' },
  { value: '75', label: '75' },
  { value: '70', label: '70' },
  { value: '65', label: '65' },
  { value: '60', label: '60' },
];

export const EDUCATION_CATEGORY = [
    { value: 'Xth', label: 'Xth' },
    { value: 'XIIth', label: 'XIIth' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'be/b.tech', label: 'BE/B.Tech' },
    { value: 'm.tech', label: 'M.tech' },
    { value: 'pg', label: 'PG' },
  ];


  export const SPECIFICATION = [
    { value: 'ssc', label: 'SSC' },
    { value: 'mpc', label: 'MPC' },
    { value: 'bipc', label: 'BIPC' },
    { value: 'ece', label: 'Ece' },
    { value: 'civil', label: 'Civil' },
    { value: 'eee', label: 'EEE' },
    { value: 'mech', label: 'Mech' },
    { value: 'cse', label: 'CSE' },
    { value: 'ee', label: 'EE' },
    { value: 'me', label: 'ME' },
    { value: 'biotechnology', label: 'Biotechnology' },
    { value: 'm.sc', label: 'M.sc' },

  ];

export const TEAMS = [
  { value: 'TeleTeachers', label: 'TeleTeachers' },
  { value: 'FreedomElectronics', label: 'FreedomElectronics' },
  { value: 'Sippio', label: 'Sippio' },
  { value: 'Kalibr8', label: 'Kalibr8' },
  { value: 'ATLC', label: 'ATLC' },
  { value: 'LoanEco', label: 'LoanEco' },
  { value: 'SiteIQ', label: 'SiteIQ' },
  { value: 'Sales', label: 'Sales' },
  { value: 'AdvancedTech', label: 'AdvancedTech' },
];

export const _userAbout = {
  id: _mock.id(1),
  role: _mock.role(1),
  email: _mock.email(1),
  country: countries[1].label,
  school: _mock.companyName(2),
  company: _mock.companyName(1),
  coverUrl: _mock.image.cover(3),
  totalFollowers: _mock.number.nativeL(1),
  totalFollowing: _mock.number.nativeL(2),
  quote:
    'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
  socialLinks: {
    id: _mock.id(1),
    facebook: `https://www.facebook.com/caitlyn.kerluke`,
    instagram: `https://www.instagram.com/caitlyn.kerluke`,
    linkedin: `https://www.linkedin.com/in/caitlyn.kerluke`,
    twitter: `https://www.twitter.com/caitlyn.kerluke`,
    userId: _mock.id(1),
  },
};

export const _userFollowers = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  country: countries[index + 1].label,
  avatarUrl: _mock.image.avatar(index),
}));

export const _userFriends = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  role: _mock.role(index),
  name: _mock.fullName(index),
  avatarUrl: _mock.image.avatar(index),
}));

export const _userGallery = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  postedAt: _mock.time(index),
  title: _mock.postTitle(index),
  imageUrl: _mock.image.cover(index),
}));

export const _userFeeds = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  createdAt: _mock.time(index),
  media: _mock.image.travel(index + 1),
  message: _mock.sentence(index),
  personLikes: [...Array(20)].map((__, personIndex) => ({
    name: _mock.fullName(personIndex),
    avatarUrl: _mock.image.avatar(personIndex + 2),
  })),
  comments: (index === 2 && []) || [
    {
      id: _mock.id(7),
      author: {
        id: _mock.id(8),
        avatarUrl: _mock.image.avatar(index + 5),
        name: _mock.fullName(index + 5),
      },
      createdAt: _mock.time(2),
      message: 'Praesent venenatis metus at',
    },
    {
      id: _mock.id(9),
      author: {
        id: _mock.id(10),
        avatarUrl: _mock.image.avatar(index + 6),
        name: _mock.fullName(index + 6),
      },
      createdAt: _mock.time(3),
      message:
        'Etiam rhoncus. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus.',
    },
  ],
}));

export const _userCards = [...Array(21)].map((_, index) => ({
  id: _mock.id(index),
  role: _mock.role(index),
  name: _mock.fullName(index),
  coverUrl: _mock.image.cover(index),
  avatarUrl: _mock.image.avatar(index),
  totalFollowers: _mock.number.nativeL(index),
  totalPosts: _mock.number.nativeL(index + 2),
  totalFollowing: _mock.number.nativeL(index + 1),
}));

export const _userPayment = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  cardNumber: ['**** **** **** 1234', '**** **** **** 5678', '**** **** **** 7878'][index],
  cardType: ['mastercard', 'visa', 'visa'][index],
  primary: index === 1,
}));

export const _userAddressBook = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  primary: index === 0,
  name: _mock.fullName(index),
  phoneNumber: _mock.phoneNumber(index),
  fullAddress: _mock.fullAddress(index),
  addressType: (index === 0 && 'Home') || 'Office',
}));

export const _userInvoices = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  invoiceNumber: `INV-199${index}`,
  createdAt: _mock.time(index),
  price: _mock.number.price(index),
}));

export const _userPlans = [
  {
    subscription: 'basic',
    price: 0,
    primary: false,
  },
  {
    subscription: 'starter',
    price: 4.99,
    primary: true,
  },
  {
    subscription: 'premium',
    price: 9.99,
    primary: false,
  },
];

  export const _educationList = [...Array(20)].map((_, index) => ({
    id: _mock.id(index),
    educationCtegory: _mock.fullName(index),
    specification: _mock.id(index),
    instituteName: 'rsr', // Replace with the desired fromDate
    // reason: 'Vacation', // Replace with the desired reason
    fromDate: '2019-08-05', // Replace with the desired toDate
    endDate: '2023-05-06', // Replace with the desired numberOfDays
    uploadDocument: 'Education', 
    status:
    (index % 2 && 'pending') || (index % 3 && 'rejected')  || 'approved',
  


}));


export const _accountList = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  zipCode: '85807',
  state: 'Virginia',
  city: 'Rancho Cordova',
  role: _mock.role(index),
  email: _mock.email(index),
  address: '908 Jack Locks',

  firstName: _mock.fullName(index),
  lastName: _mock.fullName(index),
  isVerified: _mock.boolean(index),
  disabled: _mock.boolean(index),
  company: _mock.companyName(index),
  country: countries[index + 1].label,
  avatarUrl: _mock.image.avatar(index),
  coverUrl: _mock.image.avatar(index),
  phoneNumber: _mock.phoneNumber(index),
  organizationId: '',
  totalFollowers: 1,
  totalFollowing: 1,
  team: 'Sales',
  status:
    (index % 2 && 'pending') || (index % 3 && 'banned') || (index % 4 && 'rejected') || 'active',
}));


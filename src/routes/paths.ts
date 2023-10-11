// utils
import { paramCase } from 'src/utils/change-case';
import { _id, _postTitles } from 'src/_mock/assets';

const MOCK_ID = _id[1];

// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id: string) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
      forgotPassword: `${ROOTS.AUTH}/jwt/forgot-password`,
      verify: `${ROOTS.AUTH}/jwt/verify`,
      newPassword: `${ROOTS.AUTH}/jwt/new-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/one`,
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },

    leave: {
      root: `${ROOTS.DASHBOARD}/leave`,
      new: `${ROOTS.DASHBOARD}/leave/new`,
      list: `${ROOTS.DASHBOARD}/leave/list`,
      create: `${ROOTS.DASHBOARD}/leave/create`,
      // edit: `${ROOTS.DASHBOARD}/leave/edit`
      // cards: `${ROOTS.DASHBOARD}/leave/cards`,
      // profile: `${ROOTS.DASHBOARD}/leave/profile`,
      // account: `${ROOTS.DASHBOARD}/leave/account`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/leave/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/leave/${MOCK_ID}/edit`,
      },
    },


    education: {
      root: `${ROOTS.DASHBOARD}/education`,
      new: `${ROOTS.DASHBOARD}/education/new`,
      list: `${ROOTS.DASHBOARD}/education/list`,
      create: `${ROOTS.DASHBOARD}/education/create`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/education/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/education/${MOCK_ID}/edit`,
    },
  },


  asset: {

    root: `${ROOTS.DASHBOARD}/asset`,

    new: `${ROOTS.DASHBOARD}/asset/new`,

    list: `${ROOTS.DASHBOARD}/asset/list`,

    create: `${ROOTS.DASHBOARD}/asset/create`,

    edit: (id: string) => `${ROOTS.DASHBOARD}/asset/${id}/edit`,

 

    demo: {

      edit: `${ROOTS.DASHBOARD}/asset/${MOCK_ID}/edit`,

    },

  },


    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/product/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/product/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/product/${MOCK_ID}/edit`,
      },
    },
    order: {
      root: `${ROOTS.DASHBOARD}/order`,
      details: (id: string) => `${ROOTS.DASHBOARD}/order/${id}`,
      demo: {
        details: `${ROOTS.DASHBOARD}/order/${MOCK_ID}`,
      },
    },
  },
};

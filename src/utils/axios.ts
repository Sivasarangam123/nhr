import axios, { AxiosRequestConfig } from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  social: '/api/social',
  auth: {
    me: '/api/user/current',
    login: '/api/auth/login',
    register: '/api/auth/register',
    forgotPassword: '/api/auth/forgot-password',
    newPassword: '/api/auth/reset-password',
  },
  user: {
    list: '/api/user/',
    details: '/api/user',
    search: '/api/user/search',
    new: '/api/user/',
  },

  leave: {
    list: '/api/leave/',
    details: '/api/leave/details',
    search: '/api/leave/search',
    create: '/api/leave/',
    new: '/api/leave/',
    edit: (id:string) => `/api/leave/${id}`,
    delete: (id:string) => `/api/leave/${id}`,
  },

  education: {
    list: '/api/education/',
    details: '/api/education/details',
    search: '/api/education/search',
    create: '/api/education/',
    new: '/api/education/',
    edit: (id:string) => `/api/education/${id}`,
    delete: (id:string) => `/api/education/${id}`,
  },


  asset: {

    list: '/api/asset/',

    details: '/api/asset/details',

    search: '/api/asset/search',

    create: '/api/asset/',

    new: '/api/asset/',

    edit: (id:string) => `/api/asset/${id}`,

    delete: (id:string) => `/api/asset/${id}`,

  },

  
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: 'https://api-dev-minimal-v510.vercel.app/api/product/details',
    search: 'https://api-dev-minimal-v510.vercel.app/api/product/search',
  },
};

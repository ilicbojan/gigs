import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IBand, IBandsListVm } from '../models/band';
import { ICafe, ICafesListVm } from '../models/cafe';
import { IGig, IGigsListVm } from '../models/gig';
import { IUser, IUserFormValues } from '../models/user';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === 'Network Error' && !error.response) {
    toast.error('Network error - make sure API is running!');
  }
  const { status, headers } = error.response;
  if (status === 404) {
    history.push('/notfound');
  }
  if (
    status === 401 &&
    headers['www-authenticate'].includes('Bearer error="invalid_token"')
  ) {
    window.localStorage.removeItem('jwt');
    history.push('/');
    toast.info('Your session has expired, please login again');
  }
  if (status === 500) {
    toast.error('Server error - check the terminal for more info!');
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Bands = {
  list: (): Promise<IBandsListVm> => requests.get('/bands'),
  details: (id: number): Promise<IBand> => requests.get(`/bands/${id}`),
  create: (band: IBand): Promise<number> => requests.post('/bands', band),
  update: (band: IBand) => requests.put(`/bands/${band.id}`, band),
  delete: (id: number) => requests.del(`/bands/${id}`),
};

const Cafes = {
  list: (): Promise<ICafesListVm> => requests.get('/cafes'),
  details: (id: number): Promise<ICafe> => requests.get(`/cafes/${id}`),
  create: (cafe: ICafe): Promise<number> => requests.post('/cafes', cafe),
  update: (cafe: ICafe) => requests.put(`/cafes/${cafe.id}`, cafe),
  delete: (id: number) => requests.del(`/cafes/${id}`),
};

const Gigs = {
  list: (): Promise<IGigsListVm> => requests.get('/gigs'),
  details: (id: number): Promise<IGig> => requests.get(`/gigs/${id}`),
  create: (gig: IGig): Promise<number> => requests.post('/gigs', gig),
  update: (gig: IGig) => requests.put(`/gigs/${gig.id}`, gig),
  delete: (id: number) => requests.del(`/gigs/${id}`),
};

const Users = {
  current: (): Promise<IUser> => requests.get('/users/current'),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/users/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/users/register`, user),
};

export default {
  Bands,
  Cafes,
  Gigs,
  Users,
};

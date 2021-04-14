import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IBand, IBandsListVm } from '../models/band';
import { ICafe, ICafesListVm } from '../models/cafe';
import { IGig, IGigsListVm } from '../models/gig';

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
  const { status, data, config, headers } = error.response;
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
  if (
    status === 400 &&
    config.method === 'get' &&
    data.errors.hasOwnProperty('id')
  ) {
    history.push('/notfound');
  }
  if (status === 500) {
    toast.error('Server error - check the terminal for more info!');
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

// slow communication with API, use just in DEVELOPMENT
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
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

export default {
  Bands,
  Cafes,
  Gigs,
};

import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import { IUser } from '../models/user';
import { RootStore } from './rootStore';

export default class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  user: IUser | null = null;
  loadingGigs = false;
  submitting = false;
  error: AxiosResponse | null = null;

  get isLoggedIn(): boolean {
    return !!this.user;
  }
}

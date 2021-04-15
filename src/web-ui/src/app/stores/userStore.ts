import { AxiosResponse } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { history } from '../..';
import agent from '../api/agent';
import { IUser, IUserFormValues } from '../models/user';
import { RootStore } from './rootStore';

export default class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  user: IUser | null = null;
  loadingUsers = false;
  submitting = false;
  error: AxiosResponse | null = null;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  login = async (values: IUserFormValues) => {
    this.submitting = true;
    try {
      const user = await agent.Users.login(values);
      runInAction(() => {
        this.user = user;
        this.submitting = false;
      });
      this.rootStore.commonStore.setToken(user.token);
      history.push('/');
      toast.success('Welcome, ' + user.email);
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
    }
  };

  register = async (values: IUserFormValues) => {
    this.submitting = true;
    try {
      if (values.password === values.confirmPassword) {
        const user = await agent.Users.register(values);
        runInAction(() => {
          this.user = user;
          this.submitting = false;
        });
        this.rootStore.commonStore.setToken(user.token);
        history.push('/');
        toast.success('Welcome, ' + user.email);
      } else {
        toast.error('Password and confirmed password are not the same');
      }
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
    }
  };

  currentUser = async () => {
    try {
      const user = await agent.Users.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
      });
    }
  };

  logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    toast.info('You are logged out');
    history.push('/');
  };

  clearError = () => {
    this.error = null;
  };
}

import { AxiosResponse } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { history } from '../..';
import agent from '../api/agent';
import { ICafe } from '../models/cafe';
import { RootStore } from './rootStore';

export default class CafeStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  cafeRegistry = new Map();
  cafe: ICafe | null = null;
  loadingCafes = false;
  submitting = false;
  error: AxiosResponse | null = null;

  get cafes(): ICafe[] {
    return Array.from(this.cafeRegistry.values());
  }

  loadCafes = async () => {
    this.loadingCafes = true;
    try {
      const { cafes } = await agent.Cafes.list();
      runInAction(() => {
        cafes.forEach((cafe) => {
          this.cafeRegistry.set(cafe.id, cafe);
        });
        this.loadingCafes = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingCafes = false;
      });
    }
  };

  loadCafe = async (id: number) => {
    let cafe = this.getCafe(id);
    if (cafe) {
      this.cafe = cafe;
    } else {
      this.loadingCafes = true;
      try {
        cafe = await agent.Cafes.details(id);
        runInAction(() => {
          this.cafeRegistry.set(cafe.id, cafe);
          this.cafe = cafe;
          this.loadingCafes = false;
        });
      } catch (error) {
        runInAction(() => {
          this.loadingCafes = false;
        });
      }
    }
  };

  getCafe = (id: number): ICafe => {
    return this.cafeRegistry.get(id);
  };

  createCafe = async (cafe: ICafe) => {
    this.submitting = true;
    try {
      cafe.id = await agent.Cafes.create(cafe);
      runInAction(() => {
        this.cafeRegistry.set(cafe.id, cafe);
        this.submitting = false;
      });
      history.push('/cafes');
      toast.success('Cafe created successfully');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
    }
  };
}

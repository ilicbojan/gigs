import { AxiosResponse } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
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
}

import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
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
}

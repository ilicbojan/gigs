import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import { IGig } from '../models/gig';
import { RootStore } from './rootStore';

export default class GigStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  gigRegistry = new Map();
  gig: IGig | null = null;
  loadingGigs = false;
  submitting = false;
  error: AxiosResponse | null = null;

  get gigs(): IGig[] {
    return Array.from(this.gigRegistry.values());
  }
}

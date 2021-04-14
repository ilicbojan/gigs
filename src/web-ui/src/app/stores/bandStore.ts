import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import { IBand } from '../models/band';
import { RootStore } from './rootStore';

export default class BandStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  bandRegistry = new Map();
  band: IBand | null = null;
  loadingBands = false;
  submitting = false;
  error: AxiosResponse | null = null;

  get bands(): IBand[] {
    return Array.from(this.bandRegistry.values());
  }
}

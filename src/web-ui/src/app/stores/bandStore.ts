import { AxiosResponse } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { history } from '../..';
import agent from '../api/agent';
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

  loadBands = async () => {
    this.loadingBands = true;
    try {
      const { bands } = await agent.Bands.list();
      runInAction(() => {
        bands.forEach((band) => {
          this.bandRegistry.set(band.id, band);
        });
        this.loadingBands = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingBands = false;
      });
    }
  };

  loadBand = async (id: number) => {
    let band = this.getBand(id);
    if (band) {
      this.band = band;
    } else {
      this.loadingBands = true;
      try {
        band = await agent.Bands.details(id);
        runInAction(() => {
          this.bandRegistry.set(band.id, band);
          this.band = band;
          this.loadingBands = false;
        });
      } catch (error) {
        runInAction(() => {
          this.loadingBands = false;
        });
      }
    }
  };

  getBand = (id: number): IBand => {
    return this.bandRegistry.get(id);
  };

  createBand = async (band: IBand) => {
    this.submitting = true;
    try {
      band.id = await agent.Bands.create(band);
      runInAction(() => {
        this.bandRegistry.set(band.id, band);
        this.submitting = false;
      });
      history.push('/bands');
      toast.success('Band created successfully');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
    }
  };

  updateBand = async (band: IBand) => {
    this.submitting = true;
    try {
      band.id = this.band?.id!;
      await agent.Bands.update(band);
      runInAction(() => {
        this.bandRegistry.set(band.id, band);
        this.band = band;
        this.submitting = false;
      });
      toast.info('Band is updated successfully');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
    }
  };
}

import { AxiosResponse } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { history } from '../..';
import agent from '../api/agent';
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

  loadGigs = async () => {
    this.loadingGigs = true;
    try {
      const { gigs } = await agent.Gigs.list();
      runInAction(() => {
        gigs.forEach((gig) => {
          gig.date = new Date(gig.date);
          this.gigRegistry.set(gig.id, gig);
        });
        this.loadingGigs = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingGigs = false;
      });
    }
  };

  loadGig = async (id: number) => {
    let gig = this.getGig(id);
    if (gig) {
      this.gig = gig;
    } else {
      this.loadingGigs = true;
      try {
        gig = await agent.Gigs.details(id);
        runInAction(() => {
          gig.date = new Date(gig.date);
          this.gigRegistry.set(gig.id, gig);
          this.gig = gig;
          this.loadingGigs = false;
        });
      } catch (error) {
        runInAction(() => {
          this.loadingGigs = false;
        });
      }
    }
  };

  getGig = (id: number): IGig => {
    return this.gigRegistry.get(id);
  };

  createGig = async (gig: IGig) => {
    this.submitting = true;
    try {
      gig.id = await agent.Gigs.create(gig);
      runInAction(() => {
        this.submitting = false;
      });
      history.push('/');
      toast.success('Gig created successfully');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
    }
  };

  updateGig = async (gig: IGig) => {
    this.submitting = true;
    try {
      await agent.Gigs.update(gig);
      runInAction(() => {
        this.gigRegistry.delete(gig.id);
        this.loadGig(gig.id);
        this.submitting = false;
      });
      toast.info('Gig is updated successfully');
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.error = error;
      });
    }
  };
}

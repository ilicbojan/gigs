import { configure } from 'mobx';
import { createContext } from 'react';
import BandStore from './bandStore';
import CafeStore from './cafeStore';
import CommonStore from './commonStore';
import GigStore from './gigStore';
import UserStore from './userStore';

configure({ enforceActions: 'always' });

export class RootStore {
  commonStore: CommonStore;
  bandStore: BandStore;
  cafeStore: CafeStore;
  gigStore: GigStore;
  userStore: UserStore;

  constructor() {
    this.commonStore = new CommonStore(this);
    this.bandStore = new BandStore(this);
    this.cafeStore = new CafeStore(this);
    this.gigStore = new GigStore(this);
    this.userStore = new UserStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());

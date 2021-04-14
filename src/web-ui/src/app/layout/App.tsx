import React, { useContext, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import { ToastContainer } from 'react-toastify';
import Nav from './nav/navigation/Nav';
import GigsList from '../../features/gigs/list/GigsList';
import GigDetails from '../../features/gigs/details/GigDetails';
import BandsList from '../../features/bands/list/BandsList';
import BandDetails from '../../features/bands/details/BandDetails';
import CafesList from '../../features/cafes/list/CafesList';

const App = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { token, setAppLoaded, appLoaded } = rootStore.commonStore;

  useEffect(() => {
    if (token) {
      //currentUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [token, setAppLoaded]);

  //if (!appLoaded) return <LoadingSpinner />;

  return (
    <>
      <ToastContainer position='bottom-right' />
      <Nav />
      <div className='appContainer'>
        <Route exact path='/' component={GigsList} />
        <Route
          path={'/(.+)'}
          render={() => (
            <>
              <Switch>
                <Route exact path='/gigs/:id' component={GigDetails} />

                <Route exact path='/bands' component={BandsList} />
                <Route exact path='/bands/:id' component={BandDetails} />

                <Route exact path='/cafes' component={CafesList} />
              </Switch>
            </>
          )}
        />
      </div>
    </>
  );
});

export default withRouter(App);

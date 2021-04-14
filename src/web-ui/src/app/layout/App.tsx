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
import CafeDetails from '../../features/cafes/details/CafeDetails';
import BandCreate from '../../features/bands/create/BandCreate';
import CafeCreate from '../../features/cafes/create/CafeCreate';
import GigCreate from '../../features/gigs/create/GigCreate';
import BandEdit from '../../features/bands/edit/BandEdit';
import CafeEdit from '../../features/cafes/edit/CafeEdit';

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
                <Route exact path='/gigs/create' component={GigCreate} />
                <Route exact path='/gigs/:id' component={GigDetails} />

                <Route exact path='/bands' component={BandsList} />
                <Route exact path='/bands/create' component={BandCreate} />
                <Route exact path='/bands/:id' component={BandDetails} />
                <Route exact path='/bands/edit/:id' component={BandEdit} />

                <Route exact path='/cafes' component={CafesList} />
                <Route exact path='/cafes/create' component={CafeCreate} />
                <Route exact path='/cafes/:id' component={CafeDetails} />
                <Route exact path='/cafes/edit/:id' component={CafeEdit} />
              </Switch>
            </>
          )}
        />
      </div>
    </>
  );
});

export default withRouter(App);

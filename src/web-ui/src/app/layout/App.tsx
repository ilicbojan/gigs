import React, { useContext, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import { ToastContainer } from 'react-toastify';
import Nav from './nav/navigation/Nav';
import GigsList from '../../features/gigs/list/GigsList';
import GigDetails from '../../features/gigs/details/GigDetails';

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
              </Switch>
            </>
          )}
        />
      </div>
    </>
  );
});

export default withRouter(App);

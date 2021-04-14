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
import GigEdit from '../../features/gigs/edit/GigEdit';
import Login from '../../features/users/login/Login';
import Register from '../../features/users/register/Register';
import LoadingSpinner from './spinner/LoadingSpinner';
import PrivateRoute from './PrivateRoute';

const App = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { currentUser } = rootStore.userStore;
  const { token, setAppLoaded, appLoaded } = rootStore.commonStore;

  useEffect(() => {
    if (token) {
      currentUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [token, setAppLoaded]);

  if (!appLoaded) return <LoadingSpinner />;

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
                <PrivateRoute exact path='/gigs/create' component={GigCreate} />
                <Route exact path='/gigs/:id' component={GigDetails} />
                <PrivateRoute exact path='/gigs/edit/:id' component={GigEdit} />

                <Route exact path='/bands' component={BandsList} />
                <PrivateRoute
                  exact
                  path='/bands/create'
                  component={BandCreate}
                />
                <Route exact path='/bands/:id' component={BandDetails} />
                <PrivateRoute
                  exact
                  path='/bands/edit/:id'
                  component={BandEdit}
                />

                <Route exact path='/cafes' component={CafesList} />
                <PrivateRoute
                  exact
                  path='/cafes/create'
                  component={CafeCreate}
                />
                <Route exact path='/cafes/:id' component={CafeDetails} />
                <PrivateRoute
                  exact
                  path='/cafes/edit/:id'
                  component={CafeEdit}
                />

                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
              </Switch>
            </>
          )}
        />
      </div>
    </>
  );
});

export default withRouter(App);

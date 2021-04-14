import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';
import { ToastContainer } from 'react-toastify';
import Nav from './nav/navigation/Nav';

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
      <div className='appContainer'>Test</div>
    </>
  );
});

export default withRouter(App);

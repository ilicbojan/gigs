import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { S } from './SideDrawer.style';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../stores/rootStore';

interface IProps {
  show: boolean;
  click: () => void;
}

const SideDrawer: React.FC<IProps> = observer(({ show, click }) => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, logout } = rootStore.userStore;

  return (
    <S.SideDrawer show={show}>
      <ul>
        <li onClick={click}>
          <NavLink to='/'>Gigs</NavLink>
        </li>
        <li onClick={click}>
          <NavLink to='/bands'>Bands</NavLink>
        </li>
        <li onClick={click}>
          <NavLink to='/cafes'>Cafes</NavLink>
        </li>
        {isLoggedIn ? (
          <li onClick={click}>
            <NavLink to='/' onClick={logout}>
              Logout
            </NavLink>
          </li>
        ) : (
          <>
            <li onClick={click}>
              <NavLink to='/login'>Login</NavLink>
            </li>
            <li onClick={click}>
              <NavLink to='/register'>Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </S.SideDrawer>
  );
});

export default SideDrawer;

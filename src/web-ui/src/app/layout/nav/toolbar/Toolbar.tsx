import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { S } from './Toolbar.style';
import Burger from '../burger/Burger';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../stores/rootStore';

interface IProps {
  burgerClickHandler: () => void;
}

const Toolbar: React.FC<IProps> = observer(({ burgerClickHandler }) => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, logout } = rootStore.userStore;

  return (
    <S.Toolbar>
      <S.Navigation>
        <S.Items>
          <ul>
            <li>
              <NavLink to='/'>Gigs</NavLink>
            </li>
            <li>
              <NavLink to='/bands'>Bands</NavLink>
            </li>
            <li>
              <NavLink to='/cafes'>Cafes</NavLink>
            </li>
          </ul>
        </S.Items>
        <S.Spacer></S.Spacer>
        <S.Items>
          <ul>
            {isLoggedIn ? (
              <li>
                <NavLink to='/' onClick={logout}>
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to='/login'>Login</NavLink>
                </li>
                <li>
                  <NavLink to='/register'>Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </S.Items>

        <S.Burger>
          <Burger click={burgerClickHandler} />
        </S.Burger>
      </S.Navigation>
    </S.Toolbar>
  );
});

export default Toolbar;

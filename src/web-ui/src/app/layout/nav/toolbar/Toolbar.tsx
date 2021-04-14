import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { S } from './Toolbar.style';
import Burger from '../burger/Burger';
import { observer } from 'mobx-react-lite';

interface IProps {
  burgerClickHandler: () => void;
}

const Toolbar: React.FC<IProps> = observer(({ burgerClickHandler }) => {
  return (
    <S.Toolbar>
      <S.Navigation>
        <S.Logo>
          <Link to='/'>LOGO</Link>
        </S.Logo>
        <S.Spacer></S.Spacer>
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
        <S.Burger>
          <Burger click={burgerClickHandler} />
        </S.Burger>
      </S.Navigation>
    </S.Toolbar>
  );
});

export default Toolbar;

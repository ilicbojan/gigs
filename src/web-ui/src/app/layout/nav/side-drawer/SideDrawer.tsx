import React from 'react';
import { NavLink } from 'react-router-dom';
import { S } from './SideDrawer.style';
import { observer } from 'mobx-react-lite';

interface IProps {
  show: boolean;
  click: () => void;
}

const SideDrawer: React.FC<IProps> = observer(({ show, click }) => {
  return (
    <S.SideDrawer show={show}>
      <ul>
        <li onClick={click}>
          <NavLink to='/gigs'>Gigs</NavLink>
        </li>
        <li onClick={click}>
          <NavLink to='/bands'>Bands</NavLink>
        </li>
        <li onClick={click}>
          <NavLink to='/cafes'>Cafes</NavLink>
        </li>
      </ul>
    </S.SideDrawer>
  );
});

export default SideDrawer;

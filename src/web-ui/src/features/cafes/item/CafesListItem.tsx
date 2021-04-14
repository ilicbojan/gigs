import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../app/common/button/Button';
import { ICafe } from '../../../app/models/cafe';
import { S } from './CafesListItem.style';

interface IProps {
  cafe: ICafe;
}

const CafesListItem: React.FC<IProps> = observer(({ cafe }) => {
  return (
    <S.CafesListItem>
      <div>{cafe.name}</div>
      <div>{cafe.city}</div>
      <div>{cafe.address}</div>
      <Link to={`/cafes/${cafe.id}`}>
        <Button color='secondary'>View</Button>
      </Link>
    </S.CafesListItem>
  );
});

export default CafesListItem;

import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../app/common/button/Button';
import { IBand } from '../../../app/models/band';
import { S } from './BandsListItem.style';

interface IProps {
  band: IBand;
}

const BandsListItem: React.FC<IProps> = observer(({ band }) => {
  return (
    <S.BandsListItem>
      <div>{band.name}</div>
      <div>{band.genre}</div>
      <Link to={`/bands/${band.id}`}>
        <Button color='secondary'>View</Button>
      </Link>
      <Link to={`/bands/edit/${band.id}`}>
        <Button color='primary'>Edit</Button>
      </Link>
    </S.BandsListItem>
  );
});

export default BandsListItem;

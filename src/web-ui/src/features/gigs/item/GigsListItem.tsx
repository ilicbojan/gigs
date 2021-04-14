import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../app/common/button/Button';
import { getDate, getTime } from '../../../app/common/util/dates';
import { IGig } from '../../../app/models/gig';
import { S } from './GigsListItem.style';

interface IProps {
  gig: IGig;
}

const GigsListItem: React.FC<IProps> = observer(({ gig }) => {
  return (
    <S.GigsListItem>
      <div>{getDate(gig.date)}</div>
      <div>{getTime(gig.time)}</div>
      <div>{gig.band.name}</div>
      <div>{gig.band.genre}</div>
      <div>{gig.cafe.name}</div>
      <div>{gig.cafe.city}</div>
      <div>{gig.cafe.address}</div>
      <Link to={`/gigs/${gig.id}`}>
        <Button color='secondary'>View</Button>
      </Link>
      <Link to={`/gigs/edit/${gig.id}`}>
        <Button color='primary'>Edit</Button>
      </Link>
    </S.GigsListItem>
  );
});

export default GigsListItem;

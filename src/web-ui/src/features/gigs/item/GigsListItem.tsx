import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../app/common/button/Button';
import { IGig } from '../../../app/models/gig';
import { S } from './GigsListItem.style';

interface IProps {
  gig: IGig;
}

const GigsListItem: React.FC<IProps> = observer(({ gig }) => {
  return (
    <S.GigsListItem>
      <div>{gig.date}</div>
      <div>{gig.time}</div>
      <div>{gig.band.name}</div>
      <div>{gig.band.genre}</div>
      <div>{gig.cafe.name}</div>
      <div>{gig.cafe.city}</div>
      <div>{gig.cafe.address}</div>
      <Link to={`/gigs/${gig.id}`}>
        <Button color='secondary'>View</Button>
      </Link>
    </S.GigsListItem>
  );
});

export default GigsListItem;

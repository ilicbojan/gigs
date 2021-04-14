import { observer } from 'mobx-react-lite';
import React from 'react';
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
    </S.GigsListItem>
  );
});

export default GigsListItem;

import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import Button from '../../../app/common/button/Button';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './GigDetails.style';

interface IParams {
  id: string;
}

const GigDetails = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { loadGig, loadingGigs, gig } = rootStore.gigStore;

  const { id } = useParams<IParams>();
  const gigId = Number.parseInt(id);

  const history = useHistory();

  useEffect(() => {
    loadGig(gigId);
  }, [loadGig, gigId]);

  const handleBackClick = () => {
    history.goBack();
  };

  if (loadingGigs || !gig) return <LoadingSpinner />;

  return (
    <S.GigDetails>
      <Button color='primary' onClick={handleBackClick}>
        {'<-'} Back
      </Button>
      <div>{gig.date}</div>
      <div>{gig.time}</div>
      <div>{gig.band.name}</div>
      <div>{gig.band.genre}</div>
      <div>{gig.cafe.name}</div>
      <div>{gig.cafe.city}</div>
      <div>{gig.cafe.address}</div>
    </S.GigDetails>
  );
});

export default GigDetails;

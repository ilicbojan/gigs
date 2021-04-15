import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../../../app/common/button/Button';
import { getDotDate, getTime } from '../../../app/common/util/dates';
import NotFound from '../../../app/layout/not-found/NotFound';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './GigDetails.style';

interface IParams {
  id: string;
}

const GigDetails = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn } = rootStore.userStore;
  const {
    loadGig,
    loadingGigs,
    gig,
    deleteGig,
    submitting,
    target,
  } = rootStore.gigStore;

  const { id } = useParams<IParams>();
  const gigId = Number.parseInt(id);

  useEffect(() => {
    loadGig(gigId);
  }, [loadGig, gigId]);

  if (loadingGigs) return <LoadingSpinner />;
  else if (!gig) return <NotFound />;

  return (
    <S.GigDetails>
      <img src='/images/gig.jpg' alt='gig' />
      <div className='info'>
        <h2>Date: {getDotDate(gig.date)}</h2>
        <h2>Time: {getTime(gig.time)}</h2>
        <div>Band: {gig.band.name}</div>
        <div>Genre: {gig.band.genre}</div>
        <div>Cafe: {gig.cafe.name}</div>
        <div>City: {gig.cafe.city}</div>
        <div>Address: {gig.cafe.address}</div>
        {isLoggedIn && (
          <div className='buttons'>
            <Link to={`/gigs/edit/${gig.id}`}>
              <Button color='primary'>Edit</Button>
            </Link>
            <Button
              title={gig.id + ''}
              onClick={(e) => deleteGig(gig.id, e)}
              loading={submitting && gig.id === Number(target)}
              color='red'
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </S.GigDetails>
  );
});

export default GigDetails;

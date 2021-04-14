import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../../../app/common/button/Button';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './BandDetails.style';

interface IParams {
  id: string;
}

const BandDetails = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn } = rootStore.userStore;
  const {
    loadBand,
    loadingBands,
    band,
    deleteBand,
    submitting,
    target,
  } = rootStore.bandStore;

  const { id } = useParams<IParams>();
  const bandId = Number.parseInt(id);

  useEffect(() => {
    loadBand(bandId);
  }, [loadBand, bandId]);

  if (loadingBands || !band) return <LoadingSpinner />;

  return (
    <S.BandDetails>
      <img src='/images/band.png' alt='band' />
      <div className='info'>
        <h2>{band.name}</h2>
        <div>Members: {band.members}</div>
        <div>Genre: {band.genre}</div>
        <div>Email: {band.email}</div>
        <div>Phone: {band.phone}</div>
        {isLoggedIn && (
          <div className='buttons'>
            <Link to={`/bands/edit/${band.id}`}>
              <Button color='primary'>Edit</Button>
            </Link>
            <Button
              title={band.id + ''}
              onClick={(e) => deleteBand(band.id, e)}
              loading={submitting && band.id === Number(target)}
              color='red'
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </S.BandDetails>
  );
});

export default BandDetails;

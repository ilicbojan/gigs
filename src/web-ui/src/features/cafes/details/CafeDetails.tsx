import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../../../app/common/button/Button';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './CafeDetails.style';

interface IParams {
  id: string;
}

const CafeDetails = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn } = rootStore.userStore;
  const {
    loadCafe,
    loadingCafes,
    cafe,
    deleteCafe,
    submitting,
    target,
  } = rootStore.cafeStore;

  const { id } = useParams<IParams>();
  const cafeId = Number.parseInt(id);

  useEffect(() => {
    loadCafe(cafeId);
  }, [loadCafe, cafeId]);

  if (loadingCafes || !cafe) return <LoadingSpinner />;

  return (
    <S.CafeDetails>
      <img src='/images/cafe.jpg' alt='cafe' />
      <div className='info'>
        <h2>{cafe.name}</h2>
        <div>City: {cafe.city}</div>
        <div>Address: {cafe.address}</div>
        <div>Email: {cafe.email}</div>
        <div>Phone: {cafe.phone}</div>
        {isLoggedIn && (
          <div className='buttons'>
            <Link to={`/cafes/edit/${cafe.id}`}>
              <Button color='primary'>Edit</Button>
            </Link>
            <Button
              title={cafe.id + ''}
              onClick={(e) => deleteCafe(cafe.id, e)}
              loading={submitting && cafe.id === Number(target)}
              color='red'
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </S.CafeDetails>
  );
});

export default CafeDetails;

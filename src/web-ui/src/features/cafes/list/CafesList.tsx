import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../app/common/button/Button';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import CafesListItem from '../item/CafesListItem';
import { S } from './CafesList.style';

const CafesList = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { loadCafes, loadingCafes, cafes } = rootStore.cafeStore;

  useEffect(() => {
    loadCafes();
  }, [loadCafes]);

  return (
    <S.CafesList>
      <div className='heading'>
        <h1>Cafes List</h1>
        <Link to='/cafes/create'>
          <Button color='primary'>Create new</Button>
        </Link>
      </div>
      <S.List>
        {loadingCafes ? (
          <LoadingSpinner />
        ) : (
          cafes.map((cafe) => <CafesListItem key={cafe.id} cafe={cafe} />)
        )}
      </S.List>
    </S.CafesList>
  );
});

export default CafesList;

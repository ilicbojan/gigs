import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../app/common/button/Button';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import BandsListItem from '../item/BandsListItem';
import { S } from './BandsList.style';

const BandsList = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn } = rootStore.userStore;
  const { loadBands, loadingBands, bands } = rootStore.bandStore;

  useEffect(() => {
    loadBands();
  }, [loadBands]);

  return (
    <S.BandsList>
      <div className='heading'>
        <h1>Bands List</h1>
        {isLoggedIn && (
          <Link to='/bands/create'>
            <Button color='primary'>Create new</Button>
          </Link>
        )}
      </div>
      <S.List>
        {loadingBands ? (
          <LoadingSpinner />
        ) : (
          bands.map((band) => <BandsListItem key={band.id} band={band} />)
        )}
      </S.List>
    </S.BandsList>
  );
});

export default BandsList;

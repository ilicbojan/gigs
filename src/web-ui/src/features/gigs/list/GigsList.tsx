import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../app/common/button/Button';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import GigsListItem from '../item/GigsListItem';
import { S } from './GigsList.style';

const GigsList = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn } = rootStore.userStore;
  const { loadGigs, loadingGigs, gigs } = rootStore.gigStore;

  useEffect(() => {
    loadGigs();
  }, [loadGigs]);

  return (
    <S.GigsList>
      <div className='heading'>
        <h1>Gigs List</h1>
        {isLoggedIn && (
          <Link to='/gigs/create'>
            <Button color='primary'>Create new</Button>
          </Link>
        )}
      </div>
      <S.List>
        {loadingGigs ? (
          <LoadingSpinner />
        ) : (
          gigs.map((gig) => <GigsListItem key={gig.id} gig={gig} />)
        )}
      </S.List>
    </S.GigsList>
  );
});

export default GigsList;

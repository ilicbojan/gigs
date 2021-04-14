import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import GigsListItem from '../item/GigsListItem';
import { S } from './GigsList.style';

const GigsList = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { loadGigs, loadingGigs, gigs } = rootStore.gigStore;

  useEffect(() => {
    loadGigs();
  }, [loadGigs]);

  if (loadingGigs) return <LoadingSpinner />;

  return (
    <S.GigsList>
      <h1>Gigs</h1>
      <S.List>
        {gigs.map((gig) => (
          <GigsListItem key={gig.id} gig={gig} />
        ))}
      </S.List>
    </S.GigsList>
  );
});

export default GigsList;

import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import BandsListItem from '../item/BandsListItem';
import { S } from './BandsList.style';

const BandsList = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { loadBands, loadingBands, bands } = rootStore.bandStore;

  useEffect(() => {
    loadBands();
  }, [loadBands]);

  return (
    <S.BandsList>
      <h1>Bands</h1>
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

import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
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
      <h1>Cafes</h1>
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

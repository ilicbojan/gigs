import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './CafeDetails.style';

interface IParams {
  id: string;
}

const CafeDetails = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { loadCafe, loadingCafes, cafe } = rootStore.cafeStore;

  const { id } = useParams<IParams>();
  const cafeId = Number.parseInt(id);

  useEffect(() => {
    loadCafe(cafeId);
  }, [loadCafe, cafeId]);

  if (loadingCafes || !cafe) return <LoadingSpinner />;

  return (
    <S.CafeDetails>
      <div>{cafe.name}</div>
      <div>{cafe.city}</div>
      <div>{cafe.address}</div>
      <div>{cafe.email}</div>
      <div>{cafe.phone}</div>
    </S.CafeDetails>
  );
});

export default CafeDetails;

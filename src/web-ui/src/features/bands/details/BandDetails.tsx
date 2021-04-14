import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './BandDetails.style';

interface IParams {
  id: string;
}

const BandDetails = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { loadBand, loadingBands, band } = rootStore.bandStore;

  const { id } = useParams<IParams>();
  const bandId = Number.parseInt(id);

  useEffect(() => {
    loadBand(bandId);
  }, [loadBand, bandId]);

  if (loadingBands || !band) return <LoadingSpinner />;

  return (
    <S.BandDetails>
      <div>{band.name}</div>
      <div>{band.members}</div>
      <div>{band.genre}</div>
      <div>{band.email}</div>
      <div>{band.phone}</div>
    </S.BandDetails>
  );
});

export default BandDetails;

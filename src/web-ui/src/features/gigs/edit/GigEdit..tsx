import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import { useParams } from 'react-router-dom';
import Button from '../../../app/common/button/Button';
import Input from '../../../app/common/form/input/Input';
import Select from '../../../app/common/form/select/Select';
import { getDate } from '../../../app/common/util/dates';
import { required } from '../../../app/common/util/validation';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { IGig } from '../../../app/models/gig';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './GigEdit.style';

interface IParams {
  id: string;
}

const GigEdit = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { loadBands, loadingBands, bands } = rootStore.bandStore;
  const { loadCafes, loadingCafes, cafes } = rootStore.cafeStore;
  const { loadGig, loadingGigs, updateGig, gig } = rootStore.gigStore;

  const { id } = useParams<IParams>();
  const gigId = Number.parseInt(id);

  useEffect(() => {
    loadGig(gigId);
    loadBands();
    loadCafes();
  }, [loadGig, gigId, loadBands, loadCafes]);

  if (loadingGigs || !gig) return <LoadingSpinner />;

  return (
    <S.GigEdit>
      <h1>Update Gig</h1>
      <Form
        onSubmit={(gig: IGig) => updateGig(gig)}
        initialValues={{
          id: gig.id,
          date: getDate(gig.date),
          time: gig.time,
          bandId: gig.band.id,
          cafeId: gig.cafe.id,
        }}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name='date'
              type='date'
              label='Date'
              block
              validate={required}
              component={Input}
            />
            <Field
              name='time'
              type='time'
              label='Time'
              block
              validate={required}
              component={Input}
            />
            <Field
              name='bandId'
              label='Band'
              block
              disabled={loadingBands}
              component={Select}
            >
              {bands.map((band) => (
                <option key={band.id} value={band.id}>
                  {band.name}
                </option>
              ))}
            </Field>
            <Field
              name='cafeId'
              label='Cafe'
              block
              disabled={loadingCafes}
              component={Select}
            >
              {cafes.map((cafe) => (
                <option key={cafe.id} value={cafe.id}>
                  {cafe.name}
                </option>
              ))}
            </Field>

            <Button
              disabled={submitting}
              loading={submitting}
              color='secondary'
              block
            >
              Update
            </Button>
          </form>
        )}
      ></Form>
    </S.GigEdit>
  );
});

export default GigEdit;

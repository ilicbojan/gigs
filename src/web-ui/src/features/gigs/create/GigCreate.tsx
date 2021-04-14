import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import Button from '../../../app/common/button/Button';
import ErrorMessage from '../../../app/common/form/error/ErrorMessage';
import Input from '../../../app/common/form/input/Input';
import Select from '../../../app/common/form/select/Select';
import { required } from '../../../app/common/util/validation';
import { IGig } from '../../../app/models/gig';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './GigCreate.style';

const GigCreate = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { loadBands, loadingBands, bands } = rootStore.bandStore;
  const { loadCafes, loadingCafes, cafes } = rootStore.cafeStore;
  const { createGig, error } = rootStore.gigStore;

  useEffect(() => {
    loadBands();
    loadCafes();
  }, [loadBands, loadCafes]);

  return (
    <S.GigCreate>
      <h1>Create Gig</h1>
      <Form
        onSubmit={(gig: IGig) => createGig(gig)}
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
            {error && <ErrorMessage error={error} />}

            <Button
              disabled={submitting}
              loading={submitting}
              color='secondary'
              block
            >
              Create
            </Button>
          </form>
        )}
      ></Form>
    </S.GigCreate>
  );
});

export default GigCreate;

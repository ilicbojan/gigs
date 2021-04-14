import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import { useParams } from 'react-router';
import Button from '../../../app/common/button/Button';
import ErrorMessage from '../../../app/common/form/error/ErrorMessage';
import Input from '../../../app/common/form/input/Input';
import { required } from '../../../app/common/util/validation';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { IBand } from '../../../app/models/band';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './BandEdit.style';

interface IParams {
  id: string;
}

const BandEdit = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadBand,
    loadingBands,
    updateBand,
    band,
    error,
  } = rootStore.bandStore;

  const { id } = useParams<IParams>();
  const bandId = Number.parseInt(id);

  useEffect(() => {
    loadBand(bandId);
  }, [loadBand, bandId]);

  if (loadingBands || !band) return <LoadingSpinner />;

  return (
    <S.BandEdit>
      <h1>Update Band</h1>
      <Form
        onSubmit={(values: IBand) => updateBand(values)}
        initialValues={{
          id: band.id,
          name: band.name,
          members: band.members,
          genre: band.genre,
          email: band.email,
          phone: band.phone,
        }}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name='name'
              type='text'
              label='Name'
              block
              validate={required}
              component={Input}
            />
            <Field
              name='members'
              type='text'
              label='Members'
              block
              validate={required}
              component={Input}
            />
            <Field
              name='genre'
              type='text'
              label='Genre'
              block
              validate={required}
              component={Input}
            />
            <Field
              name='email'
              type='email'
              label='Email'
              block
              validate={required}
              component={Input}
            />
            <Field
              name='phone'
              type='text'
              label='Phone number'
              block
              validate={required}
              component={Input}
            />
            {error && <ErrorMessage error={error} />}

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
    </S.BandEdit>
  );
});

export default BandEdit;

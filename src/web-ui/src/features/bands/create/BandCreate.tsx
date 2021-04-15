import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import Button from '../../../app/common/button/Button';
import ErrorMessage from '../../../app/common/form/error/ErrorMessage';
import Input from '../../../app/common/form/input/Input';
import { required } from '../../../app/common/util/validation';
import { IBand } from '../../../app/models/band';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './BandCreate.style';

const BandCreate = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { createBand, error, clearError } = rootStore.bandStore;

  useEffect(() => {
    clearError();
  }, [clearError]);

  return (
    <S.BandCreate>
      <h1>Create Band</h1>
      <Form
        onSubmit={(band: IBand) => createBand(band)}
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
              Create
            </Button>
          </form>
        )}
      ></Form>
    </S.BandCreate>
  );
});

export default BandCreate;

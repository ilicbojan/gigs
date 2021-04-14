import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import { useParams } from 'react-router-dom';
import Button from '../../../app/common/button/Button';
import Input from '../../../app/common/form/input/Input';
import { required } from '../../../app/common/util/validation';
import LoadingSpinner from '../../../app/layout/spinner/LoadingSpinner';
import { ICafe } from '../../../app/models/cafe';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './CafeEdit.style';

interface IParams {
  id: string;
}

const CafeEdit = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { loadCafe, loadingCafes, updateCafe, cafe } = rootStore.cafeStore;

  const { id } = useParams<IParams>();
  const cafeId = Number.parseInt(id);

  useEffect(() => {
    loadCafe(cafeId);
  }, [loadCafe, cafeId]);

  if (loadingCafes || !cafe) return <LoadingSpinner />;

  return (
    <S.CafeEdit>
      <h1>Update Cafe</h1>
      <Form
        onSubmit={(cafe: ICafe) => updateCafe(cafe)}
        initialValues={{
          id: cafe.id,
          name: cafe.name,
          city: cafe.city,
          address: cafe.address,
          email: cafe.email,
          phone: cafe.phone,
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
              name='city'
              type='text'
              label='City'
              block
              validate={required}
              component={Input}
            />
            <Field
              name='address'
              type='text'
              label='Adress'
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
    </S.CafeEdit>
  );
});

export default CafeEdit;

import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import Button from '../../../app/common/button/Button';
import Input from '../../../app/common/form/input/Input';
import { required } from '../../../app/common/util/validation';
import { ICafe } from '../../../app/models/cafe';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './CafeCreate.style';

const CafeCreate = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { createCafe } = rootStore.cafeStore;

  return (
    <S.CafeCreate>
      <h1>Create Cafe</h1>
      <Form
        onSubmit={(cafe: ICafe) => createCafe(cafe)}
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
              Create
            </Button>
          </form>
        )}
      ></Form>
    </S.CafeCreate>
  );
});

export default CafeCreate;

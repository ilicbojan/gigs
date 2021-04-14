import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import Button from '../../../app/common/button/Button';
import ErrorMessage from '../../../app/common/form/error/ErrorMessage';
import Input from '../../../app/common/form/input/Input';
import { required } from '../../../app/common/util/validation';
import { IUserFormValues } from '../../../app/models/user';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './Register.style';

const Register = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { register, error } = rootStore.userStore;

  return (
    <S.Register>
      <h1>Register</h1>
      <Form
        onSubmit={(user: IUserFormValues) => register(user)}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name='email'
              type='email'
              label='Email'
              block
              validate={required}
              component={Input}
            />
            <Field
              name='password'
              type='password'
              label='Password'
              block
              validate={required}
              component={Input}
            />
            <Field
              name='confirmPassword'
              type='password'
              label='Confirm password'
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
              Register
            </Button>
          </form>
        )}
      ></Form>
    </S.Register>
  );
});

export default Register;

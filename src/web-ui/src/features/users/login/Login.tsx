import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Field, Form } from 'react-final-form';
import Button from '../../../app/common/button/Button';
import ErrorMessage from '../../../app/common/form/error/ErrorMessage';
import Input from '../../../app/common/form/input/Input';
import { required } from '../../../app/common/util/validation';
import { IUserFormValues } from '../../../app/models/user';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './Login.style';

const Login = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { login, error } = rootStore.userStore;

  return (
    <S.Login>
      <h1>Login</h1>
      <Form
        onSubmit={(user: IUserFormValues) => login(user)}
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
            {error && <ErrorMessage error={error} />}

            <Button
              disabled={submitting}
              loading={submitting}
              color='secondary'
              block
            >
              Login
            </Button>
          </form>
        )}
      ></Form>
    </S.Login>
  );
});

export default Login;

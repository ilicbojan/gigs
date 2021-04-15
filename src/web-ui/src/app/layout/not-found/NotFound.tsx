import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/button/Button';
import { S } from './NotFound.styled';

const NotFound = () => {
  return (
    <S.NotFound>
      <div className='code'>404</div>
      <div className='message'>Page Not Found</div>
      <div className='desc'>
        Ooops! We cannot find the page you are looking for
      </div>
      <Link to='/'>
        <Button color='secondary'>Go to Home</Button>
      </Link>
    </S.NotFound>
  );
};

export default NotFound;

import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../app/common/button/Button';
import { IBand } from '../../../app/models/band';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './BandsListItem.style';

interface IProps {
  band: IBand;
}

const BandsListItem: React.FC<IProps> = observer(({ band }) => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn } = rootStore.userStore;
  const { deleteBand, submitting, target } = rootStore.bandStore;

  return (
    <S.BandsListItem>
      <div className='body'>
        <img src='/images/band.png' alt='band' />
        <div className='info'>
          <h2>{band.name}</h2>
          <div>{band.genre}</div>
        </div>
      </div>
      {isLoggedIn ? (
        <div className='buttons'>
          <Link to={`/bands/${band.id}`}>
            <Button color='secondary'>View</Button>
          </Link>
          <Link to={`/bands/edit/${band.id}`}>
            <Button color='primary'>Edit</Button>
          </Link>
          <Button
            title={band.id + ''}
            onClick={(e) => deleteBand(band.id, e)}
            loading={submitting && band.id === Number(target)}
            color='red'
          >
            Delete
          </Button>
        </div>
      ) : (
        <Link to={`/bands/${band.id}`}>
          <Button color='secondary' block>
            View
          </Button>
        </Link>
      )}
    </S.BandsListItem>
  );
});

export default BandsListItem;

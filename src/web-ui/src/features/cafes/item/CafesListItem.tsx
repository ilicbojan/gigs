import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../app/common/button/Button';
import { ICafe } from '../../../app/models/cafe';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './CafesListItem.style';

interface IProps {
  cafe: ICafe;
}

const CafesListItem: React.FC<IProps> = observer(({ cafe }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteCafe, submitting, target } = rootStore.cafeStore;

  return (
    <S.CafesListItem>
      <div className='body'>
        <img src='/images/cafe.jpg' alt='band image' />
        <div className='info'>
          <h2>{cafe.name}</h2>
          <div>
            {cafe.city}, {cafe.address}
          </div>
        </div>
      </div>
      <div className='buttons'>
        <Link to={`/cafes/${cafe.id}`}>
          <Button color='secondary'>View</Button>
        </Link>
        <Link to={`/cafes/edit/${cafe.id}`}>
          <Button color='primary'>Edit</Button>
        </Link>
        <Button
          title={cafe.id + ''}
          onClick={(e) => deleteCafe(cafe.id, e)}
          loading={submitting && cafe.id === Number(target)}
          color='red'
        >
          Delete
        </Button>
      </div>
    </S.CafesListItem>
  );
});

export default CafesListItem;

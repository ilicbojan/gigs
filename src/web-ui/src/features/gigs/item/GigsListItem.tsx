import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../app/common/button/Button';
import { getDotDate, getTime } from '../../../app/common/util/dates';
import { IGig } from '../../../app/models/gig';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { S } from './GigsListItem.style';

interface IProps {
  gig: IGig;
}

const GigsListItem: React.FC<IProps> = observer(({ gig }) => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn } = rootStore.userStore;
  const { deleteGig, submitting, target } = rootStore.gigStore;

  return (
    <S.GigsListItem>
      <div className='body'>
        <img src='/images/gig.jpg' alt='gig' />
        <div className='info'>
          <h2>
            {getDotDate(gig.date)} {getTime(gig.time)}
          </h2>
          <h3>{gig.band.name}</h3>
          <div>{gig.band.genre}</div>
          <h3>{gig.cafe.name}</h3>
          <div>
            {gig.cafe.city}, {gig.cafe.address}
          </div>
        </div>
      </div>
      {isLoggedIn ? (
        <div className='buttons'>
          <Link to={`/gigs/${gig.id}`}>
            <Button color='secondary'>View</Button>
          </Link>
          <Link to={`/gigs/edit/${gig.id}`}>
            <Button color='primary'>Edit</Button>
          </Link>
          <Button
            title={gig.id + ''}
            onClick={(e) => deleteGig(gig.id, e)}
            loading={submitting && gig.id === Number(target)}
            color='red'
          >
            Delete
          </Button>
        </div>
      ) : (
        <Link to={`/gigs/${gig.id}`}>
          <Button color='secondary' block>
            View
          </Button>
        </Link>
      )}
    </S.GigsListItem>
  );
});

export default GigsListItem;

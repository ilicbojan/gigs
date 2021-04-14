import styled from 'styled-components';
import { COLOR, utilities } from '../../../app/common/util/variables';

const CafesListItem = styled.div`
  background-color: ${COLOR.white};
  border-radius: ${utilities.borderRadius};
  box-shadow: ${utilities.shadow};
  overflow: hidden;

  .body {
    img {
      width: 100%;
    }

    .info {
      padding: 0 15px;

      h2 {
        font-size: 2.5rem;
      }

      div {
        font-size: 1.8rem;
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    margin: 15px;

    button {
      font-size: 1.4rem;
      padding: 20px;
    }
  }
`;

export const S = {
  CafesListItem,
};

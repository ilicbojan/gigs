import styled from 'styled-components';
import { COLOR, utilities } from '../../../app/common/util/variables';

const GigsListItem = styled.div`
  background-color: ${COLOR.white};
  padding: 15px;
  border-radius: ${utilities.borderRadius};
  box-shadow: ${utilities.shadow};

  .body {
    display: flex;
    align-items: center;

    img {
      width: 40%;
    }

    .info {
      margin-left: 15px;

      h2 {
        font-size: 2.2rem;
      }

      h3 {
        font-size: 1.8rem;
      }

      div {
        font-size: 1.6rem;
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;

    button {
      font-size: 1.4rem;
      padding: 20px;
    }
  }
`;

export const S = {
  GigsListItem,
};

import styled from 'styled-components';
import { BREAKPOINTS } from '../../../app/common/util/variables';

const BandDetails = styled.div`
  padding: 10px;

  @media ${BREAKPOINTS.lg} {
    padding: 20px 0;
    display: flex;

    img {
      width: 30%;
    }

    .info {
      margin-left: 40px;

      h2 {
        font-size: 5rem;
      }

      div {
        font-size: 2.5rem;
      }

      .buttons {
        display: flex;
      }

      button {
        margin-right: 20px;
        margin-top: 15px;
      }
    }
  }
`;

export const S = {
  BandDetails,
};

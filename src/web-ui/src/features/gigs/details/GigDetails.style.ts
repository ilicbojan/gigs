import styled from 'styled-components';
import { BREAKPOINTS } from '../../../app/common/util/variables';

const GigDetails = styled.div`
  padding: 10px;

  @media ${BREAKPOINTS.lg} {
    padding: 20px 0;
    display: flex;

    img {
      width: 35%;
    }

    .info {
      margin-left: 40px;

      h2 {
        font-size: 3rem;
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
  GigDetails,
};

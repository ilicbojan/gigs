import styled from 'styled-components';
import { COLOR, utilities } from '../../common/util/variables';

const NotFound = styled.div`
  height: calc(100% - ${utilities.navHeight});
  padding: 15px;
  text-align: center;
  font-size: 1.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .code {
    color: ${COLOR.red};
    font-size: 5rem;
    font-weight: bold;
  }

  .message {
    color: ${COLOR.red};
    font-size: 3rem;
    font-weight: bold;
  }

  button {
    margin-top: 15px;
  }
`;

export const S = {
  NotFound,
};

import styled from 'styled-components';
import { BREAKPOINTS } from '../../../app/common/util/variables';

const Login = styled.div`
  padding: 10px;

  @media ${BREAKPOINTS.lg} {
    width: 50%;
    margin: 20px auto;
    padding: 20px 0;
  }

  button {
    margin-top: 25px;
  }
`;

export const S = {
  Login,
};

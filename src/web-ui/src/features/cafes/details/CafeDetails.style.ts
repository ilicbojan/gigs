import styled from 'styled-components';
import { BREAKPOINTS } from '../../../app/common/util/variables';

const CafeDetails = styled.div`
  padding: 10px;

  @media ${BREAKPOINTS.lg} {
    padding: 20px 0;
  }
`;

export const S = {
  CafeDetails,
};

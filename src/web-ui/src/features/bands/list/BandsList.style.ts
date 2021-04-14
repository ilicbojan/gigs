import styled from 'styled-components';
import { BREAKPOINTS } from '../../../app/common/util/variables';

const BandsList = styled.div`
  padding: 10px;

  @media ${BREAKPOINTS.lg} {
    padding: 20px 0;
  }
`;

const List = styled.div`
  display: grid;

  @media ${BREAKPOINTS.lg} {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
`;

export const S = {
  BandsList,
  List,
};

import styled from 'styled-components';
import { BREAKPOINTS } from '../../../app/common/util/variables';

const BandsList = styled.div`
  padding: 10px;

  @media ${BREAKPOINTS.lg} {
    padding: 20px 0;
  }

  .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const List = styled.div`
  display: grid;

  @media ${BREAKPOINTS.lg} {
    margin-top: 20px;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
`;

export const S = {
  BandsList,
  List,
};

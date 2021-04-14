import styled, { keyframes } from 'styled-components';
import { COLOR } from '../../common/util/variables';

const spinner = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    height: 60px;
    width: 60px;
    margin-top: -30px;
    margin-left: -30px;
    border-radius: 50%;
    border: 4px solid ${COLOR.white};
    border-top-color: ${COLOR.primary};
    animation: ${spinner} 0.7s linear infinite;
  }
`;

export const S = {
  LoadingSpinner,
};

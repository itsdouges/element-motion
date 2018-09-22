import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Screen = styled.main`
  box-shadow: 0 1px 40px rgba(32, 33, 36, 0.15);
  background-color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

export const LightLink = styled(Link)`
  color: white;
`;

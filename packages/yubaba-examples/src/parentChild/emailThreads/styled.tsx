import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Card = styled.li`
  display: block;
  height: 100px;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;

  &:hover {
    background-color: #ccc;
  }
`;

export const Screen = styled.main`
  box-shadow: 0 1px 40px rgba(32, 33, 36, 0.15);
  cursor: pointer;
  background-color: #ccc;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

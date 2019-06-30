import styled from 'styled-components';
import { colors } from '@element-motion/dev';

export const Button = styled.button`
  width: 100px;
  height: 100px;
  background: ${colors.red};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  border: none;
  border-radius: 3px;
`;

export const Container = styled.div<{ interactive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 300px;
  background-color: #f3f3f3;
  cursor: ${props => (props.interactive ? 'pointer' : 'default')};
  ${props =>
    props.interactive
      ? `
    :hover {
        background-color: #ccc;
    }
  `
      : ''};
`;

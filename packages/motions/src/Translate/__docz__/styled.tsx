import styled from 'styled-components';
import { colors } from '@element-motion/dev';

export const Menu = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.red};
  border-radius: ${props => (props.isExpanded ? 3 : 1)}px;
  color: white;
  height: 200px;
  width: 200px;
  margin-left: ${props => (props.right ? 'auto' : 0)};
  cursor: pointer;

  > div {
    background-color: black;
  }
`;

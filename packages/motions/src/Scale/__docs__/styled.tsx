import styled from 'styled-components';
import { colors } from '@element-motion/dev';

export const Container = styled.div`
  height: 250px;
`;

export const Text = styled.div`
  padding: 16px;
  color: white;
`;

export const Root = styled.div<{ big: boolean }>`
  background-color: ${colors.red};
  width: ${props => (props.big ? '100%' : '150px')};
  height: ${props => (props.big ? '100%' : '150px')};
  cursor: pointer;
`;

export const Menu = styled.div<any>`
  display: inline-block;
  flex-direction: column;
  background-color: #393939;
  border-radius: ${props => (props.isExpanded ? 3 : 1)}px;
  color: #fff;
  box-shadow: 0 1px 5px rgba(32, 33, 36, 0.5);
  position: relative;
  overflow: ${props => props.overflow};
`;

export const MenuItems = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const MenuButton = styled.div`
  padding: 8px;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

export const MenuItem = styled.li`
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  display: block;
  padding: 8px;
  white-space: nowrap;
`;

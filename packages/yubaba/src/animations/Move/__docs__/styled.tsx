import styled from 'styled-components';

export const Box = styled.div<{ alignRight: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  width: 250px;
  height: 250px;
  background-color: #dc143c;
  cursor: pointer;
  margin-left: ${props => (props.alignRight ? '0' : 'auto')};
`;

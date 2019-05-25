import styled from 'styled-components';

export const Box = styled.div<{ alignRight: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  width: 250px;
  height: 250px;
  background-color: ${props => (!props.alignRight ? '#DC143C' : '#f3f3f3')};
  cursor: pointer;
  margin-left: ${props => (props.alignRight ? '0' : 'auto')};
`;

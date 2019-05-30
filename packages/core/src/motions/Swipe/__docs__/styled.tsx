import styled from 'styled-components';

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

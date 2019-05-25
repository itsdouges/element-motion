import styled from 'styled-components';

export const Button = styled.button`
  width: 100px;
  height: 100px;
  background: #ff5e6d;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
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

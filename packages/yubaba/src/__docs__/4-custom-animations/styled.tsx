import styled from 'styled-components';

export const InlineBlock = styled.div`
  display: inline-block;
  padding: 50px;
  background-color: #d93337;
  color: white;
  font-weight: 500;
  cursor: pointer;
  align-self: ${(props: any) => props.alignSelf};
`;

export const CenterChildren = styled.div`
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

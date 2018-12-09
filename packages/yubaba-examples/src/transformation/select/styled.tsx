import styled from 'styled-components';

export const Value = styled.div`
  display: block;
  border-radius: 3px;
  padding: 20px 15px;
  font-family: Roboto, HelveticaNeue, Arial, sans-serif;
  cursor: pointer;
  background-color: white;
`;

export const Description = styled.small`
  display: block;
`;

export const List = styled.div`
  padding: 10px;

  ${Value} {
    margin-bottom: 10px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    transition: box-shadow 200ms ease-in-out;
    padding: 20px 25px;

    :hover {
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
    }
  }
`;

import styled from 'styled-components';

const StickyButton = styled.button`
  position: fixed;
  bottom: 10px;
  left: 10px;
  font-size: 20px;
  border-radius: 4px;
  background-color: #ccc;
  border: 2px solid grey;
  padding: 8px;
  z-index: 999;
`;

export default StickyButton;

import styled from 'styled-components';

export const Container = styled.div`
  padding: 50px;
  height: 500px;
  position: relative;
  overflow: hidden;
  color: #6772e5;

  p {
    color: black;
    opacity: 0.5;
  }
`;

export const Header = styled.header`
  margin-right: auto;
  font-size: 30px;
  flex-shrink: 0;
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(150deg, #53f 15%, #05d5ff 70%, #a6ffcb 94%);
  position: absolute;
  top: 0;
  left: 0;
`;

export const ModalDialog = styled.ul`
  position: relative;
  padding: 0 20px;
  margin: 0;
  overflow: auto;
`;

export const Button = styled.button`
  border-radius: 5px;
  position: absolute;
  top: 16px;
  right: 20px;
  border: 2px solid #6772e5;
  background: #6772e5;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

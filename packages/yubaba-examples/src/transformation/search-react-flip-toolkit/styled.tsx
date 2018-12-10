import styled from 'styled-components';

export const Blanket = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 800;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  font-size: 20px;
  padding: 20px;
  border-radius: 3px;
  border: 0;
  background-color: white;
  z-index: 2;
  position: relative;

  :focus {
    outline: 0;
  }
`;

export const StickyInput = styled(Input)`
  margin-top: 20px;
`;

export const InputBackground = styled.div`
  background-color: white;
  height: 100px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: -1;
`;

export const Banner = styled.div`
  height: 60vh;
  min-height: 400px;
  background-color: #2eb886;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-bottom: 70vh;

  * {
    box-sizing: border-box;
  }
`;

export const Header = styled.h1`
  font-size: 30px;
  color: white;
  font-family: Roboto, HelveticaNeue, Arial, sans-serif;
  font-weight: 400;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const StickyContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 900;
`;

export const InputStaticBackground = styled.div`
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  border-radius: 3px;
`;

export const RelativeContainer = styled.div`
  position: relative;
  border-radius: 3px;
`;

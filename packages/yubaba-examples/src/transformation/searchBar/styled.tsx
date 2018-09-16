import styled from 'styled-components';

export const FloatingSearchBar = styled.div`
  margin: 200px 30px;
  height: 50px;
  border-radius: 8px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: flex;
  justify-content: center;
  background: white;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  line-height: 25px;
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 0 0 0 16px;
  font-size: 16px;
  word-wrap: break-word;
  outline: none;
  display: flex;
  flex: 1;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
  color: inherit;
`;

export const FixedSearchBar = styled.div`
  display: flex;
  justify-content: center;
  color: rgba(0, 0, 0, 0.87);
  border-bottom: 1px solid #dfe1e5;
  position: absolute;
  margin-top: 26px;
  top: 0;
  left: 0;
  right: 0;
  background: white;
`;

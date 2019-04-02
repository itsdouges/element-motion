import styled, { css } from 'styled-components';

export const Header = styled.header`
  margin-top: 26px;
  padding: 5px;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
`;

export const Logo = styled.div`
  background-position: 0 -374px;
  background-size: 167px;
  height: 36px;
  width: 92px;
  margin-left: 92px;
  margin-top: 10px;
`;

export const SearchForm = styled.div`
  height: 80px;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  border-radius: 8px;
  margin-left: 8px;
  margin-right: 8px;
`;

export interface ImageProps {
  src: string;
  title: string;
  from: string;
  in?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export const Root = styled.div`
  margin-bottom: 16px;
`;

export const Img = styled.img`
  width: 100%;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.03);
`;

export const ImageTitle = styled.div`
  color: rgba(32, 33, 36, 0.8);
  font-size: 11px;
  letter-spacing: 0.2px;
  line-height: 14px;
  max-height: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 4px;
`;

export const ImageFrom = styled.div`
  color: rgba(117, 117, 117, 0.85);
  font-size: 10px;
  height: 14px;
  letter-spacing: 0.2px;
  line-height: 14px;
  overflow: hidden;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

export const ImageBack = styled.div`
  background-color: rgba(0, 0, 0, 0.03);
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  height: calc(100% - 4px);
  pointer-events: none;
`;

export const ImageContainer = styled.div`
  position: relative;
`;

export const Images = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-between;
`;

export const Column = styled.div`
  width: calc(50% - 4px);
`;

export const ImagePageRoot = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
`;

export const PageTitle = styled.div`
  color: #000000;
  display: block;
  font-size: 20px;
  line-height: 30px;
  margin-right: 32px;
  max-height: 60px;
  overflow: hidden;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-word;
`;

export const PageImage = styled.img`
  background-color: #fff;
  background-image: -webkit-linear-gradient(
      45deg,
      #efefef 25%,
      transparent 25%,
      transparent 75%,
      #efefef 75%,
      #efefef
    ),
    -webkit-linear-gradient(45deg, #efefef 25%, transparent 25%, transparent 75%, #efefef 75%, #efefef);
  background-position: 0 0, 10px 10px;
  background-size: 21px 21px;
  width: 100%;
`;

export const MetaRoot = styled.div`
  padding: 16px;
  margin-bottom: 16px;
`;

export const Copyright = styled.div`
  color: #70757a;
  font-size: 12px;
  margin-top: 16px;
`;

export const Related = styled.div`
  color: #202124;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.75px;
  line-height: 16px;
  text-decoration: none;
  text-transform: uppercase;
  margin: 8px;
`;

export const ContentContainer = styled.div`
  transition: opacity ease-out 200ms;
  background: #fff;
  margin-top: -8px;
`;

export const FadeIn = styled.div<any>`
  transition: opacity 500ms;
  opacity: ${props => (props.in ? 1 : 0)};
`;

export const Container = styled.div`
  height: 300px;
`;

export const ImageModal = styled.img<{ appearance: 'big' | 'small' }>`
  display: block;
  background-color: #fff;
  border: none;
  width: 50%;
  margin: 0 auto;
  cursor: pointer;
  box-shadow: 0 1px 10px rgba(32, 33, 36, 0.25);
  border-radius: 1px;
  z-index: 9999999;

  :focus {
    outline: 2px solid #2998f7;
    outline-offset: 5px;
  }

  ${props =>
    props.appearance === 'big'
      ? css`
          position: fixed;
          top: 5%;
          right: 5%;
          border-radius: 3px;
          box-shadow: 0 1px 50px rgba(32, 33, 36, 0.25);
          width: 90%;

          @media screen and (min-width: 1120px) {
            width: 60%;
          }
        `
      : ''};
`;

export const Center = styled.div`
  > * {
    margin: 0 auto;
  }
`;

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

export const Value = styled.div`
  display: block;
  border-radius: 3px;
  padding: 20px 15px;
  cursor: pointer;
  background-color: white;
`;

export const Description = styled.small`
  display: block;
`;

export const List = styled.div`
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

export const SelectContainer = styled.div`
  height: 398px;
`;

export const data = [
  {
    title: 'Software licensing',
    description: 'For all license needs come here.',
  },
  {
    title: 'Hardware support',
    description: 'Need more RAM? Download it here.',
  },
  {
    title: 'Forgot your password',
    description: 'Oops, it happens to the best of us...',
  },
  {
    title: 'Requesting new software',
    description: 'Need some more Slacks?',
  },
];

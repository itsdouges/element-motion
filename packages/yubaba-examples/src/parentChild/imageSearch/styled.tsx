import styled from 'styled-components';

export const Header = styled.header`
  margin-top: 26px;
  padding: 5px;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
`;

export const Logo = styled.div`
  background: url(${require('./images/google.webp')}) no-repeat;
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

export const Tags = styled.div`
  height: 40px;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  border-radius: 8px;
  margin-top: 10px;
  margin-left: 8px;
  margin-right: 8px;
`;

export const PillContainer = styled.div`
  padding-top: 10px;
  white-space: nowrap;
  overflow: auto;
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
`;

export const Pill = styled.div`
  background-color: #fff;
  border-radius: 40px;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  box-sizing: border-box;
  display: inline-block;
  margin-right: 8px;
  overflow: hidden;
  padding: 0 16px;

  > span {
    color: rgba(0, 0, 0, 0.8);
    display: inline-block;
    font-size: 14px;
    font-weight: 300;
    line-height: 40px;
    text-decoration: none;
    white-space: nowrap;
  }
`;

export interface ImageProps {
  src: string;
  title: string;
  from: string;
  in?: boolean;
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
  margin-top: -4px;
`;

export const FadeIn = styled.div<any>`
  transition: opacity 500ms;
  opacity: ${props => (props.in ? 1 : 0)};
`;

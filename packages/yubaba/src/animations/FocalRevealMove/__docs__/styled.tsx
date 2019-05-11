import styled from 'styled-components';
import { Card } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface RootProps {
  emphasis?: boolean;
  color?: string;
}

export const ContainerHeight = styled.div`
  min-height: 740px;
`;

export const Root = styled.div`
  position: relative;
  width: ${(props: RootProps) => (props.emphasis ? '100%' : '250px')};
  height: ${(props: RootProps) => (props.emphasis ? '100%' : '332px')};
  flex-shrink: 0;
  grid-column: ${(props: RootProps) => (props.emphasis ? 'span 2' : '')};
  grid-row: ${(props: RootProps) => (props.emphasis ? 'span 2' : '')};
  background: ${(props: RootProps) => props.color || ''};
`;

export const Text = styled.div`
  display: grid;
  grid-template: ${(props: RootProps) =>
    props.emphasis
      ? `'title star' auto
    'context star' auto`
      : `'title star' auto
    `};
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: #ffffffde;
  padding: 12px;
  font-family: Roboto, sans-serif;
  height: 25%;
`;

export const Title = styled.div`
  font-size: ${(props: RootProps) => (props.emphasis ? '1.25em' : '1em')};
  white-space: nowrap;
  grid-area: title;
  font-weight: 400;
  letter-spacing: 0.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Subtitle = styled.div`
  margin-top: 5px;
  font-size: 0.85em;
  grid-area: subtitle;
  justify-content: flex-start;
  font-weight: 300;
`;

export const StarContainer = styled.div`
  grid-area: star;
  justify-self: flex-end;
  align-self: ${(props: RootProps) => (props.emphasis ? 'flex-start' : 'center')};
`;

export const Context = styled.div`
  align-self: flex-end;
  font-style: italic;
  grid-area: context;
  font-size: 0.7em;
`;

export const DetailsRoot = styled.div`
  max-width: 900px;
  margin: 0 auto;
  color: white;
  font-family: Roboto, sans-serif;
`;

interface DataProps {
  color: string;
}

export const Data = styled.div`
  display: grid;
  position: relative;
  background: ${(props: DataProps) => props.color};
  grid-template:
    'album info' auto
    'album released' auto;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  cursor: pointer;
  width: 100%;
  bottom: ${(props: RootProps) => (props.emphasis ? '130px' : '70px')};
`;

export const Image = styled.img`
  height: 300px;
  width: 300px;
  grid-area: album;
`;

export const ReleasedBar = styled.div`
  background: ${(props: DataProps) => props.color};
  padding: 30px;
  grid-area: released;
  position: relative;
  opacity: 0.9;
`;

export const AlbumInfo = styled.div`
  grid-area: info;
  display: flex;
  align-items: center;
  padding: 30px;
  flex-wrap: wrap;
  position: relative;
  opacity: 0.9;
`;

export const Name = styled.div`
  width: 100%;
  margin-bottom: 20px;
  font-size: 3em;
`;

export const Artist = styled.div`
  width: 100%;
`;

export const PlayContainer = styled(Card)`
  border-radius: 50% !important;
  height: 48px;
  width: 48px;
  top: -26px;
  position: absolute;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Actions = styled.div`
  position: absolute;
  top: 18px;
  right: 12px;
`;

export const SongNumber = styled.span`
  margin-right: 20px;
`;

export const Page = styled(Card)`
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
`;

export const BackLink = styled(Link)`
  position: absolute;
  top: 18px;
  left: 12px;
  color: white;
`;

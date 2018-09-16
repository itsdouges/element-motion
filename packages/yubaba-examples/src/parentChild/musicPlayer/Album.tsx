import * as React from 'react';
import styled from 'styled-components';
import StarIcon from '@material-ui/icons/StarBorder';
import Baba, { FLIPMove as Move, CircleExpand, Collector } from 'yubaba';
import { Album as AlbumData } from './data';
import { IconButton } from '@material-ui/core';

interface Props extends AlbumData {
  emphasis?: boolean;
  onClick?: () => void;
  baba: string;
  expand?: boolean;
}

interface RootProps {
  emphasis?: boolean;
  color?: string;
}

const Root = styled.div`
  position: relative;
  width: ${(props: RootProps) => (props.emphasis ? '100%' : '250px')};
  height: ${(props: RootProps) => (props.emphasis ? '100%' : '332px')};
  flex-shrink: 0;
  grid-column: ${(props: RootProps) => (props.emphasis ? 'span 2' : '')};
  grid-row: ${(props: RootProps) => (props.emphasis ? 'span 2' : '')};
  background: ${(props: RootProps) => props.color || ''};
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  cursor: pointer;
  width: 100%;
  bottom: ${(props: RootProps) => (props.emphasis ? '130px' : '70px')};
`;

const Text = styled.div`
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

const Title = styled.div`
  font-size: ${(props: RootProps) => (props.emphasis ? '1.25em' : '1em')};
  white-space: nowrap;
  grid-area: title;
  font-weight: 400;
  letter-spacing: 0.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Subtitle = styled.div`
  margin-top: 5px;
  font-size: 0.85em;
  grid-area: subtitle;
  justify-content: flex-start;
  font-weight: 300;
`;

const StarContainer = styled.div`
  grid-area: star;
  justify-self: flex-end;
  align-self: ${(props: RootProps) => (props.emphasis ? 'flex-start' : 'center')};
`;

const Context = styled.div`
  align-self: flex-end;
  font-style: italic;
  grid-area: context;
  font-size: 0.7em;
`;

const Album: React.StatelessComponent<Props> = ({
  emphasis,
  albumArt,
  color,
  artist,
  onClick,
  name,
  baba,
  expand,
}) => {
  const Expand = expand ? CircleExpand : Collector;

  return (
    <Root emphasis={emphasis} color={color}>
      <Baba name={baba}>
        <Expand background={color}>
          <Move delay={expand ? 100 : 0}>
            {({ ref, style }) => (
              <BackgroundImage onClick={onClick} src={albumArt} style={style} innerRef={ref} />
            )}
          </Move>
        </Expand>
      </Baba>

      <Text emphasis={emphasis}>
        <Title emphasis={emphasis}>
          {name}

          <Subtitle>{artist}</Subtitle>
        </Title>

        <StarContainer emphasis={emphasis}>
          <IconButton color="inherit" aria-label="Menu">
            <StarIcon />
          </IconButton>
        </StarContainer>

        {emphasis && <Context>Recently added</Context>}
      </Text>
    </Root>
  );
};

export default Album;

import * as React from 'react';
import styled from 'styled-components';
import StarIcon from '@material-ui/icons/StarBorder';
import { Album as AlbumData } from './data';

interface Props extends AlbumData {
  emphasis?: boolean;
  onClick?: () => void;
  innerRef?: any;
  style?: any;
}

interface RootProps {
  emphasis?: boolean;
  color?: string;
}

const Root = styled.div`
  position: relative;
  width: ${(props: RootProps) => (props.emphasis ? '100%' : '200px')};
  height: ${(props: RootProps) => (props.emphasis ? '100%' : '266px')};
  flex-shrink: 0;
  cursor: pointer;
  grid-column: ${(props: RootProps) => (props.emphasis ? 'span 2' : '')};
  grid-row: ${(props: RootProps) => (props.emphasis ? 'span 2' : '')};
  background: ${(props: RootProps) => props.color || ''};
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  bottom: ${(props: RootProps) => (props.emphasis ? '130px' : '70px')};
`;

const Text = styled.div`
  display: grid;
  grid-template:
    'title star' auto
    'context star' auto;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
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
  name,
  artist,
  onClick,
  style,
  innerRef,
}) => (
  <Root emphasis={emphasis} color={color} onClick={onClick} style={style} innerRef={innerRef}>
    <BackgroundImage src={albumArt} />
    <Text>
      <Title emphasis={emphasis}>
        {name}

        <Subtitle>{artist}</Subtitle>
      </Title>

      <StarContainer emphasis={emphasis}>
        <StarIcon />
      </StarContainer>

      {emphasis && <Context>Recently added</Context>}
    </Text>
  </Root>
);

export default Album;

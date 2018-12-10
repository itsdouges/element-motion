import * as React from 'react';
import styled from 'styled-components';
import {
  Card,
  IconButton,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from '@material-ui/core';
import PlayButton from '@material-ui/icons/PlayArrow';
import MoreVert from '@material-ui/icons/MoreVert';
import StarIcon from '@material-ui/icons/StarBorder';
import { lighten, readableColor } from 'polished';
import { Album as AlbumData } from './data';
import Baba, { Move as Move, CircleShrink, Wait, Collector } from 'yubaba';

interface Props extends AlbumData {
  onClick?: () => void;
  baba: string;
  shrink: boolean;
  wait: boolean;
}

const Root = styled.div`
  width: 900px;
  margin: 0 auto;
  color: ${(props: DataProps) => (readableColor(props.color) === '#000' ? '#000000b0' : 'white')};
  font-family: Roboto, sans-serif;
  padding-top: 150px;
  padding-bottom: 124px;
`;

interface DataProps {
  color: string;
}

const Data = styled.div`
  display: grid;
  background: ${(props: DataProps) => props.color};
  grid-template:
    'album info' auto
    'album released' auto;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
`;

const Image = styled.img`
  height: 300px;
  width: 300px;
  grid-area: album;
`;

const ReleasedBar = styled.div`
  background: ${(props: DataProps) => props.color};
  padding: 30px;
  grid-area: released;
  position: relative;
  opacity: 0.9;
`;

const AlbumInfo = styled.div`
  grid-area: info;
  display: flex;
  align-items: center;
  padding: 30px;
  flex-wrap: wrap;
  position: relative;
  opacity: 0.9;
`;

const Name = styled.div`
  width: 100%;
  margin-bottom: 20px;
  font-size: 3em;
`;

const Artist = styled.div`
  width: 100%;
`;

const PlayContainer = styled(Card)`
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

const Actions = styled.div`
  position: absolute;
  top: 18px;
  right: 12px;
`;

const SongNumber = styled.span`
  margin-right: 20px;
`;

const Page = styled(Card)`
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
`;

export default class AlbumDetails extends React.Component<Props> {
  render() {
    const { baba, color, shrink, wait, albumArt, name, artist, songs } = this.props;
    const Shrink = shrink ? CircleShrink : Collector;
    const WaitFor = wait ? Wait : Collector;

    return (
      <Root color={color}>
        <Page raised elevation={20} style={{ minHeight: '90vh', overflow: 'visible' }}>
          <Data color={color}>
            <Baba name={baba}>
              <Move>
                <WaitFor>
                  <Shrink background={color}>
                    {({ ref, style }) => <Image src={albumArt} style={style} innerRef={ref} />}
                  </Shrink>
                </WaitFor>
              </Move>
            </Baba>

            <AlbumInfo>
              <Actions>
                <IconButton color="inherit" aria-label="Menu">
                  <StarIcon />
                </IconButton>

                <IconButton color="inherit" aria-label="Menu">
                  <MoreVert />
                </IconButton>
              </Actions>

              <div>
                <Name>{name}</Name>
                <Artist>{artist}</Artist>
              </div>
            </AlbumInfo>

            <ReleasedBar color={lighten(0.1)(color)}>
              Released March, 2013
              <PlayContainer>
                <IconButton>
                  <PlayButton />
                </IconButton>
              </PlayContainer>
            </ReleasedBar>
          </Data>

          <Table style={{ marginLeft: '5%', width: '92%' }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Track</strong>
                </TableCell>
                <TableCell>
                  <strong>Artist</strong>
                </TableCell>
                <TableCell numeric>
                  <strong>Time</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {songs.map((song, index) => (
                <TableRow>
                  <TableCell>
                    <SongNumber>{index + 1}</SongNumber> {song.name}
                  </TableCell>
                  <TableCell>{artist}</TableCell>
                  <TableCell numeric>{song.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Page>
      </Root>
    );
  }
}

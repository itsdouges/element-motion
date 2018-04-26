import * as React from 'react';
import { Album as AlbumData } from './data';

interface Props extends AlbumData {
  onClick?: () => void;
  baba: string;
}

export default class AlbumDetails extends React.Component<Props> {
  render() {
    return 'hi';
  }
}

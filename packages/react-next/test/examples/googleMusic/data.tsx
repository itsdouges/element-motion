export interface Song {
  name: string;
  time: string;
}

export interface Album {
  name: string;
  artist: string;
  color: string;
  recentlyAdded?: boolean;
  heroBg: string;
  albumArt: string;
  songs: Song[];
  emphasis?: boolean;
}

const albums: Album[] = [
  {
    name: 'In a Perfect World',
    artist: 'Kodaline',
    recentlyAdded: true,
    heroBg: '',
    color: '#223350',
    albumArt: require('./kodaline.jpg'),
    songs: [],
    emphasis: true,
  },
  {
    name: 'Supermodel',
    artist: 'Foster the People',
    heroBg: '',
    color: '#265968',
    albumArt: require('./foster.jpg'),
    songs: [],
  },
  {
    name: 'Halcyon Days',
    artist: 'Ellie Goulding',
    heroBg: '',
    color: '#78014f',
    albumArt: require('./halcyda.png'),
    songs: [],
  },
  {
    name: 'Native',
    artist: 'One Republic',
    heroBg: '',
    color: '#aa003a',
    albumArt: require('./native.png'),
    songs: [],
  },
  {
    name: 'Comedown Machine',
    artist: 'The Strokes',
    heroBg: '',
    albumArt: require('./comedownmachine.jpg'),
    color: '#92010d',
    songs: [],
  },
  {
    name: 'G I R L',
    artist: 'Pharrell Williams',
    heroBg: '',
    albumArt: require('./girl.png'),
    color: '#f7bb0e',
    songs: [],
    emphasis: true,
  },
  {
    name: 'Jamie Lidell',
    artist: 'Jamie Lidell',
    heroBg: '',
    color: '#aba9a2',
    albumArt: require('./jamielidell.jpg'),
    songs: [],
  },
  {
    name: 'Rumours',
    artist: 'Fleetwood Mac',
    heroBg: '',
    color: '#dca710',
    albumArt: require('./rumours.jpg'),
    songs: [],
  },
  {
    name: 'Holy Fire',
    artist: 'Foals',
    heroBg: '',
    color: '#b19f46',
    albumArt: require('./foals.jpeg'),
    songs: [],
  },
];

export default albums;

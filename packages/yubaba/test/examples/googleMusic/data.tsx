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
    albumArt: require('./images/kodaline.jpg'),
    songs: [
      { name: 'One Day', time: '4:15' },
      { name: 'All I Want', time: '5:05' },
      { name: 'Love Like This', time: '3:36' },
      { name: 'High Hopes', time: '3:50' },
      { name: 'Brand New Day', time: '3:25' },
      { name: 'After The Fall', time: '3:35' },
      { name: 'Big Bad World', time: '4:21' },
      { name: 'All Comes Down', time: '4:55' },
      { name: 'Talk', time: '4:28' },
      { name: 'Pray', time: '3:33' },
      { name: 'Way Back When', time: '3:26' },
    ],
    emphasis: true,
  },
  {
    name: 'Supermodel',
    artist: 'Foster the People',
    heroBg: '',
    color: '#265968',
    albumArt: require('./images/foster.jpg'),
    songs: [
      { name: 'Are You What You Want to Be?', time: '4:30' },
      { name: 'Ask Yourself', time: '4:23' },
      { name: 'Coming of Age', time: '4:40' },
      { name: 'Nevermind', time: '5:17' },
      { name: 'Pseudologia Fantastica', time: '5:31' },
      { name: 'The Angelic Welcome of Mr. Jones', time: '0:33' },
      { name: 'Best Friend', time: '4:28' },
      { name: "A Beginner's Guide to Destroying the Moon", time: '5:09' },
      { name: 'The Truth', time: '4:22' },
      { name: 'Fire Escape', time: '4:29' },
    ],
  },
  {
    name: 'Halcyon Days',
    artist: 'Ellie Goulding',
    heroBg: '',
    color: '#78014f',
    albumArt: require('./images/halcyda.png'),
    songs: [
      { name: "Don't Say a Word", time: '4:07' },
      { name: 'My Blood', time: '3:54' },
      { name: 'Anything Could Happen', time: '4:47' },
      { name: 'Only You', time: '3:51' },
      { name: 'Halcyon', time: '3:25' },
      { name: 'Figure 8', time: '4:08' },
      { name: 'Joy', time: '3:14' },
      { name: 'Hanging On', time: '3:22' },
      { name: 'Explosions', time: '4:03' },
      { name: 'I Know You Care', time: '3:26' },
      { name: 'Atlantis', time: '3:53' },
      { name: 'Dead in the Water', time: '4:44' },
      {
        name: 'I Need Your Love (Calvin Harris featuring Ellie Goulding) (bonus track)',
        time: '3:58',
      },
      { name: 'Burn', time: '3:51' },
      { name: 'Goodness Gracious', time: '3:46' },
      { name: 'You My Everything', time: '3:29' },
      { name: 'Hearts Without Chains', time: '3:45' },
      { name: 'Stay Awake (with Madeon)', time: '3:26' },
      { name: 'Under Control', time: '4:06' },
      { name: 'Flashlight (with DJ Fresh)', time: '3:33' },
      { name: 'How Long Will I Love You (bonus track)', time: '2:34' },
    ],
  },
  {
    name: 'Native',
    artist: 'One Republic',
    heroBg: '',
    color: '#aa003a',
    albumArt: require('./images/native.png'),
    songs: [],
  },
  {
    name: 'Comedown Machine',
    artist: 'The Strokes',
    heroBg: '',
    albumArt: require('./images/comedownmachine.jpg'),
    color: '#92010d',
    songs: [],
  },
  {
    name: 'G I R L',
    artist: 'Pharrell Williams',
    heroBg: require('./images/pharrel-large.jpg'),
    albumArt: require('./images/girl.png'),
    color: '#f7bb0e',
    songs: [
      { name: 'Marilyn Monroe', time: '5:51' },
      { name: 'Brand New (duet with Justin Timberlake)', time: '4:31' },
      { name: 'Hunter', time: '4:00' },
      { name: 'Gush', time: '3:54' },
      { name: 'Happy', time: '3:53' },
      { name: 'Come Get It Bae', time: '3:21' },
      { name: 'Gust of Wind', time: '4:45' },
      { name: 'Lost Queen', time: '7:56' },
      { name: 'Know Who You Are (duet with Alicia Keys)', time: '3:56' },
      { name: 'It Girl', time: '4:49' },
    ],
    emphasis: true,
  },
  {
    name: 'Jamie Lidell',
    artist: 'Jamie Lidell',
    heroBg: '',
    color: '#aba9a2',
    albumArt: require('./images/jamielidell.jpg'),
    songs: [],
  },
  {
    name: 'Rumours',
    artist: 'Fleetwood Mac',
    heroBg: '',
    color: '#bdb27b',
    albumArt: require('./images/rumours.jpg'),
    songs: [],
  },
  {
    name: 'Holy Fire',
    artist: 'Foals',
    heroBg: '',
    color: '#b19f46',
    albumArt: require('./images/foals.jpeg'),
    songs: [],
  },
];

export default albums;

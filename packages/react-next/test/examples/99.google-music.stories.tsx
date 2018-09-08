import styled from 'styled-components';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import BodyClassName from 'react-body-classname';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  createMuiTheme,
  MuiThemeProvider,
} from 'material-ui';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreVert from '@material-ui/icons/MoreVert';
import BackIcon from '@material-ui/icons/ArrowBack';
import Album from './googleMusic/Album';
import { BabaManager } from '../../src';
import data from './googleMusic/data';
import createScrollStore from '../RestoreScrollOnMount';
import ScrollTopOnMount from '../ScrollTopOnMount';
import AlbumDetails from './googleMusic/AlbumDetails';

const RestoreScrollOnMount = createScrollStore();

interface BackgroundProps {
  background: string;
}

const Container = styled.div`
  padding-top: 66px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props: BackgroundProps) => props.background};
`;

const DetailsContainer = Container.extend`
  z-index: 1111;
  position: absolute;
  top: 0;
  min-height: 100vh;
  left: 0;
  right: 0;
`;

const ItemList = styled.div`
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(5, auto);
  grid-gap: 4px;
`;

const NoMarginBody = styled(BodyClassName)`
  margin: 0;
  background: #212121;
`;

const FixedBg = styled.div`
  position: fixed;
  background: ${(props: BackgroundProps) => props.background};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-size: cover;
  background-position-y: -110px;
  background-repeat: no-repeat;
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#fff',
    },
  },
});

class MultipleTargets extends React.Component<{
  expand?: boolean;
  shrink?: boolean;
  wait?: boolean;
}> {
  state = {
    shown: undefined,
  };

  select = (index?: number) => {
    this.setState({
      shown: index,
    });
  };

  getKey() {
    return [
      'multiple-targets',
      'move',
      this.props.expand && 'expand',
      this.props.shrink && 'shrink',
      this.props.wait && 'wait',
    ]
      .filter(Boolean)
      .join('-');
  }

  renderItems() {
    const items = data.map((data, index) => (
      <Album
        expand={this.props.expand}
        baba={`${this.getKey()}-${index}`}
        onClick={() => this.select(index)}
        key={index}
        {...data}
      />
    ));

    return (
      <BabaManager key="b">
        {props => (
          <Container background="#212121" {...props}>
            <RestoreScrollOnMount />
            <NoMarginBody className="" />
            <ItemList>{items}</ItemList>
          </Container>
        )}
      </BabaManager>
    );
  }

  renderDetails(index?: number) {
    const hero = index && data[index].heroBg;

    return (
      <BabaManager key="c">
        {props => (
          <DetailsContainer background="" {...props}>
            <FixedBg
              background={this.props.expand && hero ? `url(${hero})` : data[index || 0].color}
            />
            <AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none' }}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="Menu"
                  style={{ marginRight: '10px' }}
                  onClick={() => this.select()}
                >
                  <BackIcon />
                </IconButton>

                <IconButton color="inherit" aria-label="Menu" style={{ marginLeft: 'auto' }}>
                  <SearchIcon />
                </IconButton>

                <IconButton color="inherit" aria-label="Menu">
                  <MoreVert />
                </IconButton>
              </Toolbar>
            </AppBar>

            <NoMarginBody className="" />
            <ScrollTopOnMount />

            <AlbumDetails
              baba={`${this.getKey()}-${index}`}
              shrink={!!this.props.shrink}
              wait={!!this.props.wait}
              {...data[index || 0]}
            />
          </DetailsContainer>
        )}
      </BabaManager>
    );
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" style={{ marginRight: '10px' }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              My Library
            </Typography>

            <IconButton color="inherit" aria-label="Menu" style={{ marginLeft: 'auto' }}>
              <SearchIcon />
            </IconButton>

            <IconButton color="inherit" aria-label="Menu">
              <MoreVert />
            </IconButton>
          </Toolbar>
        </AppBar>

        {this.state.shown !== undefined ? this.renderDetails(this.state.shown) : this.renderItems()}
      </MuiThemeProvider>
    );
  }
}

storiesOf('Examples/GoogleMusic', module)
  .add('cross fade move', () => <MultipleTargets />)
  .add('+ expand', () => <MultipleTargets expand />)
  .add('+ shrink', () => <MultipleTargets expand shrink />)
  .add('+ wait', () => <MultipleTargets expand shrink wait />);

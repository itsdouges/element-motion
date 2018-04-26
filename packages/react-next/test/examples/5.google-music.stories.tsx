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
import Album from './googleMusic/Album';
import Baba, { Move, BabaManager, CircleShrink, Wait, Collector } from '../../src';
import data from './googleMusic/data';
import createScrollStore from '../RestoreScrollOnMount';
import ScrollTopOnMount from '../ScrollTopOnMount';

const RestoreScrollOnMount = createScrollStore();

const BigRoot = styled.div`
  width: 500px;
  height: 300px;
  background: blue;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :after {
    content: 'click me';
    color: white;
  }
`;

interface BackgroundProps {
  background: string;
}

const Container = styled.div`
  padding: 186px 0 120px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props: BackgroundProps) => props.background};
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
    const Shrink = this.props.shrink ? CircleShrink : Collector;
    const WaitFor = this.props.wait ? Wait : Collector;

    return (
      <BabaManager key="c">
        {props => (
          <Container background={this.props.expand ? 'purple' : 'white'} {...props}>
            <NoMarginBody className="" />
            <ScrollTopOnMount />

            <Baba name={`${this.getKey()}-${index}`}>
              <Move>
                <WaitFor>
                  <Shrink background="purple">
                    {({ ref, style }) => (
                      <BigRoot onClick={() => this.select()} style={style} innerRef={ref} />
                    )}
                  </Shrink>
                </WaitFor>
              </Move>
            </Baba>
          </Container>
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
  .add('move', () => <MultipleTargets />)
  .add('move expand', () => <MultipleTargets expand />)
  .add('move expand shrink', () => <MultipleTargets expand shrink />)
  .add('move expand shrink wait', () => <MultipleTargets expand shrink wait />);

import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { storiesOf } from '@storybook/react';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import Baba, { RevealMove, ConcealMove, FocalTarget as Target } from 'yubaba';
import * as Common from 'yubaba-common';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreVert from '@material-ui/icons/MoreVert';
import ImageIcon from '@material-ui/icons/Image';
import StarIcon from '@material-ui/icons/StarBorder';
import BackIcon from '@material-ui/icons/ArrowBack';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  Avatar,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import * as Styled from './styled';
import { data } from './data';

const Home = (props: { in: boolean }) => (
  <React.Fragment>
    <Typography
      gutterBottom
      variant="subheading"
      color="inherit"
      style={{ marginTop: 20, marginLeft: 22 }}
    >
      Today
    </Typography>

    <List>
      {data.map((email, index) => (
        <React.Fragment key={index}>
          <Baba name={`card-${index}`} in={props.in}>
            <RevealMove duration={600}>
              {baba => (
                <ListItem
                  innerRef={ref => baba.ref(findDOMNode(ref) as HTMLElement)}
                  style={baba.style}
                  button
                >
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                  <ListItemText
                    primary={email.title}
                    secondary={`${email.recipients} - ${email.body}`}
                    secondaryTypographyProps={{ noWrap: true }}
                  />
                  <Styled.StyledLink to={`/screen/${index}`} />
                </ListItem>
              )}
            </RevealMove>
          </Baba>
          <Divider inset component="li" />
        </React.Fragment>
      ))}
    </List>
  </React.Fragment>
);

const Screen = (props: { index: number }) => (
  <Baba name={`card-${props.index}`}>
    <ConcealMove>
      {baba => (
        <Styled.Screen innerRef={baba.ref} style={baba.style} className={baba.className} {...props}>
          <ListItem>
            <Typography variant="title">{data[props.index].title}</Typography>
            <IconButton
              color="inherit"
              aria-label="Menu"
              style={{ marginLeft: 'auto', marginRight: '-10px' }}
            >
              <StarIcon />
            </IconButton>
          </ListItem>

          <Divider />

          <Target>
            {targetProps => (
              <ListItem innerRef={ref => targetProps.ref(findDOMNode(ref) as HTMLElement)}>
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText
                  primary={data[props.index].title}
                  secondary={data[props.index].recipients}
                />
              </ListItem>
            )}
          </Target>

          <ListItem>
            <Typography variant="body2">{data[props.index].body}</Typography>
          </ListItem>
        </Styled.Screen>
      )}
    </ConcealMove>
  </Baba>
);

const AppBarActions = () => (
  <Switch>
    <Route
      render={() => (
        <Styled.LightLink to="/">
          <IconButton
            color="inherit"
            aria-label="Menu"
            style={{ marginLeft: '-15px', marginRight: 20 }}
          >
            <BackIcon />
          </IconButton>
        </Styled.LightLink>
      )}
      path="/screen/:index"
    />

    <Route
      path="*"
      render={() => (
        <React.Fragment>
          <IconButton
            color="inherit"
            aria-label="Menu"
            style={{ marginLeft: '-15px', marginRight: 20 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="title" color="inherit">
            Inbox
          </Typography>
        </React.Fragment>
      )}
    />
  </Switch>
);

const buildApp = (initialEntry = '/') => () => (
  <MemoryRouter initialEntries={[initialEntry]}>
    <Common.SmallViewport
      invertColor
      appBar={
        <AppBar
          position="static"
          style={{ paddingTop: 26, background: 'rgb(97, 0, 236)', zIndex: 1 }}
        >
          <Toolbar>
            <AppBarActions />

            <IconButton color="inherit" aria-label="Menu" style={{ marginLeft: 'auto' }}>
              <SearchIcon />
            </IconButton>

            <IconButton color="inherit" aria-label="Menu" style={{ marginRight: '-15px' }}>
              <MoreVert />
            </IconButton>
          </Toolbar>
        </AppBar>
      }
    >
      <Route render={props => <Screen index={props.match.params.index} />} path="/screen/:index" />

      <Route path="/" exact>
        {props => <Home in={!!props.match} aria-hidden={!props.match} />}
      </Route>
    </Common.SmallViewport>
  </MemoryRouter>
);

storiesOf('yubaba-examples/ParentChild/EmailThreads', module)
  .add('Default', withMarkdownNotes('')(buildApp()))
  .add('Screen', withMarkdownNotes('')(buildApp('/screen/1')));

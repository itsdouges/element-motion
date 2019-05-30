/* eslint-disable import/no-extraneous-dependencies, react/no-array-index-key */
import * as React from 'react';
import * as Common from '@element-motion/dev';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreVert from '@material-ui/icons/MoreVert';
import ImageIcon from '@material-ui/icons/Image';
import StarIcon from '@material-ui/icons/StarBorder';
import BackIcon from '@material-ui/icons/ArrowBack';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
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
import { WrappedMotion as Motion } from '../../Motion';
import FocalRevealMove from '../../motions/FocalRevealMove';
import FocalConcealMove from '../../motions/FocalConcealMove';
import FocalTarget from '../../FocalTarget';

const EmailChain = () => {
  const home = (props: any) => (
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
        {Styled.data.map((email, index) => (
          <React.Fragment key={index}>
            <Motion name={`card-${index}`} in={props.in}>
              <FocalRevealMove duration={600}>
                {motion => (
                  <div {...motion}>
                    <ListItem button>
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
                  </div>
                )}
              </FocalRevealMove>
            </Motion>
            <Divider variant="inset" />
          </React.Fragment>
        ))}
      </List>
    </React.Fragment>
  );

  const screen = (props: any) => (
    <Motion name={`card-${props.index}`}>
      <FocalConcealMove>
        {motion => (
          <Styled.Screen {...motion} {...props}>
            <ListItem>
              <Typography variant="h6">{Styled.data[props.index].title}</Typography>
              <IconButton
                color="inherit"
                aria-label="Menu"
                style={{ marginLeft: 'auto', marginRight: '-10px' }}
              >
                <StarIcon />
              </IconButton>
            </ListItem>

            <Divider />

            <FocalTarget>
              {targetProps => (
                <div ref={targetProps.ref}>
                  <ListItem>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                    <ListItemText
                      primary={Styled.data[props.index].title}
                      secondary={Styled.data[props.index].recipients}
                    />
                  </ListItem>
                </div>
              )}
            </FocalTarget>

            <ListItem>
              <Typography variant="body1">{Styled.data[props.index].body}</Typography>
            </ListItem>
          </Styled.Screen>
        )}
      </FocalConcealMove>
    </Motion>
  );

  const appBarActions = () => (
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

            <Typography variant="h6" color="inherit">
              Inbox
            </Typography>
          </React.Fragment>
        )}
      />
    </Switch>
  );

  return (
    <MemoryRouter>
      <Common.SmallViewport
        invertColor
        appBar={
          <AppBar
            position="static"
            style={{ paddingTop: 26, background: 'rgb(97, 0, 236)', zIndex: 1 }}
          >
            <Toolbar>
              {appBarActions()}

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
        <Route
          render={(props: any) => screen({ index: props.match.params.index })}
          path="/screen/:index"
        />

        <Route path="/" exact>
          {props => home({ in: !!props.match, 'aria-hidden': !props.match })}
        </Route>
      </Common.SmallViewport>
    </MemoryRouter>
  );
};

export default EmailChain;

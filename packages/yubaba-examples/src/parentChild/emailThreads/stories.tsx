import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import Baba, { FLIPMove } from 'yubaba';
import * as Common from 'yubaba-common';
import * as Styled from './styled';
import { data } from './data';

const Home = (props: { in: boolean }) => (
  <ul>
    {data.map((email, index) => (
      <Baba name={`card-${index}`} key={index} in={props.in}>
        <FLIPMove duration={500}>
          {baba => (
            <Styled.Card innerRef={baba.ref} style={baba.style}>
              {email.title}

              <Styled.StyledLink to={`/screen/${index}`} />
            </Styled.Card>
          )}
        </FLIPMove>
      </Baba>
    ))}
  </ul>
);

const Screen = (props: { index: number }) => (
  <Baba name={`card-${props.index}`}>
    <FLIPMove>
      {baba => (
        <Styled.Screen innerRef={baba.ref} style={baba.style} {...props}>
          {data[props.index].title}

          <Styled.StyledLink to="/" />
        </Styled.Screen>
      )}
    </FLIPMove>
  </Baba>
);

storiesOf('yubaba-examples/ParentChild/EmailThreads', module).addWithJSX(
  'Default',
  withMarkdownNotes(`
# Basic

This example shows an inline item expanding to a new page using the CrossFadeMove component, along with react-router-dom for the routing.

See [this video](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1DenoCsHNb_H1S1zErzmGCxhz6wjmdO8y%2F01-hierarchy-parentchild.mp4) for the inspiration.
`)(() => (
    <Common.SmallViewport>
      <MemoryRouter>
        <div>
          <Route
            render={props => <Screen index={props.match.params.index} />}
            path="/screen/:index"
          />

          <Route path="/" exact>
            {props => <Home in={!!props.match} aria-hidden={!props.match} />}
          </Route>
        </div>
      </MemoryRouter>
    </Common.SmallViewport>
  ))
);

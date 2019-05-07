/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { Toggler } from 'yubaba-common';
import { WrappedBaba as Baba } from '../../Baba';
import Reveal from './index';

const Container = styled.div`
  margin: 0.67rem 0;
  background-color: #ccc;
`;

const Header = styled.h1`
  margin: 0.67rem 0;
`;

storiesOf('yubaba/Reveal', module).add('ChildrenHeightChanging', () => (
  <Container>
    <Toggler>
      {toggler => (
        <Baba name="reveal" key={`${toggler.shown}`}>
          <Reveal>
            {baba => (
              <div {...baba}>
                {toggler.shown ? (
                  <>
                    <Header>Details</Header>
                    <p>Many details are revealed here.</p>
                    <button type="button" onClick={() => toggler.toggle()}>
                      Hide contents
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={() => toggler.toggle()}>
                    View contents
                  </button>
                )}
              </div>
            )}
          </Reveal>
        </Baba>
      )}
    </Toggler>
  </Container>
));

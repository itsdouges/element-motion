import * as React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import Baba, { Collector, CollectorChildrenProps, CollectorActions, BabaManager } from '../../src';
import Toggler from '../Toggler';
import StickyButton from '../StickyButton';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

const Noop: React.StatelessComponent<CollectorChildrenProps & { duration: number }> = ({
  children,
  duration,
}) => (
  <Collector
    data={{
      action: CollectorActions.animation,
      payload: {
        abort: () => {},
        cleanup: () => {},
        afterAnimate: () => Promise.resolve(),
        animate: () => new Promise(resolve => setTimeout(resolve, duration)),
        beforeAnimate: () => Promise.resolve(),
      },
    }}
  >
    {children}
  </Collector>
);

storiesOf('Examples/Manager', module)
  .add('with no manager', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Container>
              <Baba name="manager-example-1" key="1">
                <Noop duration={500}>
                  {({ ref, style }) => (
                    <div style={style} ref={ref}>
                      hi im the source target
                    </div>
                  )}
                </Noop>
              </Baba>
            </Container>
          ) : (
            <Container>
              hi im content around the baba target i will be shown immediately
              <Baba name="manager-example-1" key="2">
                {({ ref, style }) => (
                  <div style={style} ref={ref}>
                    hi im the destination target i will be shown when all animations have finished
                  </div>
                )}
              </Baba>
            </Container>
          )}
        </div>
      )}
    </Toggler>
  ))
  .add('with manager', () => (
    <Toggler>
      {({ shown, toggle }) => (
        <div>
          <StickyButton onClick={toggle}>toggle</StickyButton>
          {!shown ? (
            <Container>
              <Baba name="manager-example-2" key="1">
                <Noop duration={500}>
                  {({ ref, style }) => (
                    <div style={style} ref={ref}>
                      hi im the source target
                    </div>
                  )}
                </Noop>
              </Baba>
            </Container>
          ) : (
            <BabaManager>
              {props => (
                <Container {...props}>
                  hi im content around the baba target i will be shown after all animations have
                  finished
                  <Baba name="manager-example-2" key="2">
                    {({ ref, style }) => (
                      <div style={style} ref={ref}>
                        hi im the destination target i will be shown when all animations have
                        finished
                      </div>
                    )}
                  </Baba>
                </Container>
              )}
            </BabaManager>
          )}
        </div>
      )}
    </Toggler>
  ));

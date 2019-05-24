import * as React from 'react';
import * as Common from 'yubaba-common'; // eslint-disable-line import/no-extraneous-dependencies
import { Transition } from 'react-transition-group'; // eslint-disable-line import/no-extraneous-dependencies
import ReshapingContainer from '../index';
import * as Styled from './styled';

const menuPosition = [200, 100, 20];
const innerTimeout = { enter: 200, exit: 300 };

const TripeHoverMenu = () => (
  <Common.Toggler
    interval
    onIntervalSet={val => ({ in: true, shown: `${(val.shown ? val.shown + 1 : 0) % 3}` })}
  >
    {toggler => (
      <Styled.Container>
        <Styled.Background />

        <Styled.Header>
          <span>
            tripe{' '}
            <span role="img" aria-label="tripe">
              🥩
            </span>
          </span>

          <Styled.MenuLink
            href="#"
            onMouseEnter={() => toggler.set({ in: true, shown: '0' })}
            onFocus={() => toggler.set({ in: true, shown: '0' })}
            onMouseLeave={() => toggler.set({ in: false, shown: '0' })}
            onBlur={() => toggler.set({ in: false, shown: '0' })}
          >
            Products
          </Styled.MenuLink>
          <Styled.MenuLink
            href="#"
            onMouseEnter={() => toggler.set({ in: true, shown: '1' })}
            onFocus={() => toggler.set({ in: true, shown: '1' })}
            onMouseLeave={() => toggler.set({ in: false, shown: '1' })}
            onBlur={() => toggler.set({ in: false, shown: '1' })}
          >
            Developers
          </Styled.MenuLink>
          <Styled.MenuLink
            href="#"
            onMouseEnter={() => toggler.set({ in: true, shown: '2' })}
            onFocus={() => toggler.set({ in: true, shown: '2' })}
            onMouseLeave={() => toggler.set({ in: false, shown: '2' })}
            onBlur={() => toggler.set(false)}
          >
            Company
          </Styled.MenuLink>
        </Styled.Header>

        <Transition
          in={toggler.shown && toggler.shown.in}
          unmountOnExit
          mountOnEnter
          timeout={{ enter: 0, exit: 100 }}
        >
          {state => (
            <Styled.ContainerPositioning
              state={state}
              style={{
                position: 'absolute',
                top: 100,
                right: menuPosition[toggler.shown.shown],
              }}
            >
              <ReshapingContainer
                triggerKey={toggler.shown.shown}
                boxShadow="0 50px 100px -20px rgba(50,50,93,.25), 0 30px 60px -30px rgba(0,0,0,.3), 0 -18px 60px -10px rgba(0,0,0,.025)"
                background="#fff"
                maxWidth="500px"
                borderRadius="3px"
                padding="16px"
              >
                {anim => (
                  <Styled.Menu style={anim.style}>
                    <Transition
                      in={toggler.shown.shown === '0'}
                      timeout={innerTimeout}
                      unmountOnExit
                      mountOnEnter
                    >
                      {tstate => (
                        <Styled.InnerMenu state={tstate}>
                          <Styled.MenuItem>
                            Pricing
                            <small>Find out how much tripe you can buy for $100</small>
                          </Styled.MenuItem>
                          <Styled.MenuItem>
                            Billing
                            <small>Need an invoice? Look in here</small>
                          </Styled.MenuItem>
                          <Styled.MenuItem>
                            Connect
                            <small>Find other tripe enthusiasts? Check here first</small>
                          </Styled.MenuItem>
                        </Styled.InnerMenu>
                      )}
                    </Transition>

                    <Transition
                      in={toggler.shown.shown === '1'}
                      timeout={innerTimeout}
                      unmountOnExit
                      mountOnEnter
                    >
                      {tstate => (
                        <Styled.InnerMenu state={tstate}>
                          <Styled.MenuItem>
                            Recipes
                            <small>Find the best way to cook it</small>
                          </Styled.MenuItem>
                        </Styled.InnerMenu>
                      )}
                    </Transition>

                    <Transition
                      in={toggler.shown.shown === '2'}
                      timeout={innerTimeout}
                      unmountOnExit
                      mountOnEnter
                    >
                      {tstate => (
                        <Styled.InnerMenu state={tstate}>
                          <Styled.MenuItem>About Tripe</Styled.MenuItem>
                          <Styled.MenuItem>Customers</Styled.MenuItem>
                          <Styled.MenuItem>Jobs</Styled.MenuItem>
                        </Styled.InnerMenu>
                      )}
                    </Transition>
                  </Styled.Menu>
                )}
              </ReshapingContainer>
            </Styled.ContainerPositioning>
          )}
        </Transition>
      </Styled.Container>
    )}
  </Common.Toggler>
);

export default TripeHoverMenu;

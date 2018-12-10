import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Select from 'react-select';
import Baba, { FLIPMove as Move } from 'yubaba';
import { Toggler } from 'yubaba-common';
import * as Styled from './styled';
import data from './data';

const DURATION = 350;

storiesOf('yubaba-examples/Transformation/Select', module).add('Default', () => (
  <Toggler>
    {({ shown, toggle }) =>
      shown ? (
        <Baba name={`item-${shown}`}>
          <Move duration={DURATION}>
            {baba => (
              <div {...baba}>
                <Select
                  autoFocus
                  isSearchable={false}
                  value={{}}
                  styles={{
                    singleValue: () => ({}),
                  }}
                  onKeyDown={() => toggle()}
                  formatOptionLabel={() => (
                    <Styled.Value>
                      {data[+shown].title}
                      <Styled.Description>{data[+shown].description}</Styled.Description>
                    </Styled.Value>
                  )}
                />
              </div>
            )}
          </Move>
        </Baba>
      ) : (
        <Styled.List>
          {data.map((item, index) => (
            <Baba key={index} name={`item-${index}`}>
              <Move duration={DURATION}>
                {baba => (
                  <Styled.Value
                    onClick={() => toggle(`${index}`)}
                    style={baba.style}
                    innerRef={baba.ref}
                  >
                    {item.title}
                    <Styled.Description>{item.description}</Styled.Description>
                  </Styled.Value>
                )}
              </Move>
            </Baba>
          ))}
        </Styled.List>
      )
    }
  </Toggler>
));

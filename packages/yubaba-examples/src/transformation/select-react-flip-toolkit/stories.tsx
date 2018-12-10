import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Select from 'react-select';
import { Toggler } from 'yubaba-common';
import { Flipper, Flipped } from 'react-flip-toolkit';
import * as Styled from './styled';
import data from './data';

storiesOf('yubaba-examples/Transformation/Select/react-flip-toolkit', module).add('Default', () => (
  <Toggler>
    {({ shown, toggle }) => (
      <Flipper flipKey={shown}>
        {shown ? (
          <Flipped flipId={`item-${shown}`}>
            <div>
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
          </Flipped>
        ) : (
          <Styled.List>
            {data.map((item, index) => (
              <Flipped key={index} flipId={`item-${index}`}>
                <Styled.Value onClick={() => toggle(`${index}`)}>
                  {item.title}
                  <Styled.Description>{item.description}</Styled.Description>
                </Styled.Value>
              </Flipped>
            ))}
          </Styled.List>
        )}
      </Flipper>
    )}
  </Toggler>
));

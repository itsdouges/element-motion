import { storiesOf } from '@storybook/react';
import * as React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import BackIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

import * as Common from 'yubaba-common';
import Baba, { FLIPMove, BabaManager } from 'yubaba';
import * as Styled from './styled';

const Image: React.StatelessComponent<Styled.ImageProps> = ({
  src,
  title,
  from,
  onClick,
  in: inn,
  selected,
}) => (
  <Styled.Root>
    <Styled.ImageContainer>
      <Baba name={title} in={inn}>
        <FLIPMove>
          {({ ref, style }) => (
            <Styled.Img
              src={src}
              onClick={onClick}
              innerRef={ref}
              style={{ ...style, opacity: selected ? 0 : (style.opacity as any) }}
            />
          )}
        </FLIPMove>
      </Baba>

      <Styled.ImageBack />
    </Styled.ImageContainer>

    <Styled.ImageTitle>{title}</Styled.ImageTitle>
    <Styled.ImageFrom>{from}</Styled.ImageFrom>
  </Styled.Root>
);

const ImagePage: React.StatelessComponent<Styled.ImageProps> = ({ src, title, onClick }) => (
  <BabaManager name={title}>
    {props => (
      <Styled.ImagePageRoot {...props}>
        <IconButton
          color="default"
          aria-label="Menu"
          style={{ top: 26, left: 0, position: 'absolute' }}
          onClick={onClick}
        >
          <BackIcon color="inherit" />
        </IconButton>

        <Baba name={title}>
          <FLIPMove>
            {({ ref, style }) => <Styled.PageImage src={src} innerRef={ref} style={style} />}
          </FLIPMove>
        </Baba>

        <Styled.ContentContainer>
          <Styled.FadeIn in={props.style.visibility !== 'hidden'}>
            <Styled.MetaRoot>
              <Styled.PageTitle>{title}</Styled.PageTitle>
              <Styled.Copyright>Images may be subject to copyright.</Styled.Copyright>
            </Styled.MetaRoot>

            <Styled.Images>
              <Styled.Related>Related images</Styled.Related>
              <Styled.Related>See more</Styled.Related>
            </Styled.Images>

            <Styled.Images>
              <Styled.Column>
                <Image
                  src={require('./images/4.png')}
                  title="Washington Capitals - Wikipedia 1"
                  from="en.wikipedia.org"
                />
                <Image
                  src={require('./images/4.png')}
                  title="Washington Capitals - Wikipedia 2"
                  from="en.wikipedia.org"
                />
                <Image
                  src={require('./images/4.png')}
                  title="Washington Capitals - Wikipedia 3"
                  from="en.wikipedia.org"
                />
              </Styled.Column>
              <Styled.Column>
                <Image
                  src={require('./images/4.png')}
                  title="Washington Capitals - Wikipedia 4"
                  from="en.wikipedia.org"
                />
                <Image
                  src={require('./images/4.png')}
                  title="Washington Capitals - Wikipedia 5"
                  from="en.wikipedia.org"
                />
                <Image
                  src={require('./images/4.png')}
                  title="Washington Capitals - Wikipedia 6"
                  from="en.wikipedia.org"
                />
              </Styled.Column>
            </Styled.Images>
          </Styled.FadeIn>
        </Styled.ContentContainer>
      </Styled.ImagePageRoot>
    )}
  </BabaManager>
);

storiesOf('yubaba-examples/ParentChild/ImageSearch', module).add('Default', () => (
  <Common.Toggler>
    {({ toggle, shown }) => (
      <Common.SmallViewport>
        <Styled.Header>
          <IconButton color="default" aria-label="Menu" style={{ marginRight: '10px' }}>
            <MenuIcon />
          </IconButton>

          <Styled.Logo />
        </Styled.Header>

        <Styled.SearchForm />
        <Styled.Tags />
        <Styled.PillContainer>
          <Styled.Pill>
            <span>alex ovechkin</span>
          </Styled.Pill>
          <Styled.Pill>
            <span>blue jackets</span>
          </Styled.Pill>
          <Styled.Pill>
            <span>maple leafs</span>
          </Styled.Pill>
          <Styled.Pill>
            <span>stanley cup</span>
          </Styled.Pill>
        </Styled.PillContainer>

        <Styled.Images>
          <Styled.Column>
            <Image
              src={require('./images/1.png')}
              title="Official Washington Capitals Website | NHL.com"
              from="nhl.com"
              onClick={toggle}
            />
            <Image
              src={require('./images/3.jpeg')}
              title="Washington Capitals: 2017 Season Preview, Predictions"
              from="puckprose.com"
              onClick={toggle}
            />
            <Image
              src={require('./images/6.jpeg')}
              title="The Washington Capitals are up to their old tricks again ..."
              from="nhl.nbcsports.com"
              onClick={toggle}
            />
          </Styled.Column>
          <Styled.Column>
            <Image
              src={require('./images/4.png')}
              title="Washington Capitals - Wikipedia"
              from="en.wikipedia.org"
              onClick={toggle}
              in={!shown}
              selected={!!shown}
            />
            <Image
              src={require('./images/5.png')}
              title="Washington Capitals - Home | Facebook"
              from="facebook.com"
              onClick={toggle}
            />
            <Image
              src={require('./images/2.jpeg')}
              title="Capitals Announce 2017-18 Preseason Schedule"
              from="nhl.com"
              onClick={toggle}
            />
          </Styled.Column>
        </Styled.Images>

        {shown && (
          <ImagePage
            src={require('./images/4.png')}
            title="Washington Capitals - Wikipedia"
            from="en.wikipedia.org"
            onClick={toggle}
          />
        )}
      </Common.SmallViewport>
    )}
  </Common.Toggler>
));

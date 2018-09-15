import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import BackIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

import Toggler from '../common/Toggler';
import Baba, { FLIPMove, BabaManager } from '../../src';

const Container = styled.div`
  position: relative;
  width: 400px;
  max-height: 666px;
  overflow: auto;
  border-radius: 2px;
  box-shadow: 0 1px 50px rgba(32, 33, 36, 0.1);
  border: 1px solid rgba(32, 33, 36, 0.1);
  box-sizing: border-box;
  font-family: Roboto, HelveticaNeue, Arial, sans-serif;
  user-select: none;

  * {
    box-sizing: border-box;
    user-select: none;
  }
`;

const Header = styled.header`
  padding: 5px;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
`;

const Logo = styled.div`
  background: url(${require('./images/google.webp')}) no-repeat;
  background-position: 0 -374px;
  background-size: 167px;
  height: 36px;
  width: 92px;
  margin-left: 92px;
  margin-top: 10px;
`;

const SearchForm = styled.div`
  height: 80px;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  border-radius: 8px;
  margin-left: 8px;
  margin-right: 8px;
`;

const Tags = styled.div`
  height: 40px;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  border-radius: 8px;
  margin-top: 10px;
  margin-left: 8px;
  margin-right: 8px;
`;

const PillContainer = styled.div`
  padding-top: 10px;
  white-space: nowrap;
  overflow: auto;
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
`;

const Pill = styled.div`
  background-color: #fff;
  border-radius: 40px;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  box-sizing: border-box;
  display: inline-block;
  margin-right: 8px;
  overflow: hidden;
  padding: 0 16px;

  > span {
    color: rgba(0, 0, 0, 0.8);
    display: inline-block;
    font-size: 14px;
    font-weight: 300;
    line-height: 40px;
    text-decoration: none;
    white-space: nowrap;
  }
`;

interface ImageProps {
  src: string;
  title: string;
  from: string;
  in?: boolean;
  onClick?: () => void;
}

const Root = styled.div`
  margin-bottom: 16px;
`;

const Img = styled.img`
  width: 100%;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.03);
`;

const ImageTitle = styled.div`
  color: rgba(32, 33, 36, 0.8);
  font-size: 11px;
  letter-spacing: 0.2px;
  line-height: 14px;
  max-height: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 4px;
`;

const ImageFrom = styled.div`
  color: rgba(117, 117, 117, 0.85);
  font-size: 10px;
  height: 14px;
  letter-spacing: 0.2px;
  line-height: 14px;
  overflow: hidden;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

const ImageBack = styled.div`
  background-color: rgba(0, 0, 0, 0.03);
  position: absolute;
  width: 100%;
  height: calc(100% - 4px);
  top: 0;
  pointer-events: none;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Image: React.StatelessComponent<ImageProps> = ({ src, title, from, onClick, in: inn }) => (
  <Root>
    <ImageContainer>
      <Baba name={title} in={inn}>
        <FLIPMove>
          {({ ref, style }) => <Img src={src} onClick={onClick} innerRef={ref} style={style} />}
        </FLIPMove>
      </Baba>

      <ImageBack />
    </ImageContainer>

    <ImageTitle>{title}</ImageTitle>
    <ImageFrom>{from}</ImageFrom>
  </Root>
);

const Images = styled.div`
  margin: 8px;
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  width: calc(50% - 4px);
`;

const ImagePageRoot = styled.div`
  position: fixed;
  top: 8px;
  height: 666px;
  width: 400px;
  overflow: auto;
`;

const PageTitle = styled.div`
  color: #000000;
  display: block;
  font-size: 20px;
  line-height: 30px;
  margin-right: 32px;
  max-height: 60px;
  overflow: hidden;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-word;
`;

const PageImage = styled.img`
  background-color: #fff;
  background-image: -webkit-linear-gradient(
      45deg,
      #efefef 25%,
      transparent 25%,
      transparent 75%,
      #efefef 75%,
      #efefef
    ),
    -webkit-linear-gradient(45deg, #efefef 25%, transparent 25%, transparent 75%, #efefef 75%, #efefef);
  background-position: 0 0, 10px 10px;
  background-size: 21px 21px;
  width: 100%;
`;

const MetaRoot = styled.div`
  padding: 16px;
  margin-bottom: 16px;
`;

const Copyright = styled.div`
  color: #70757a;
  font-size: 12px;
  margin-top: 16px;
`;

const Related = styled.div`
  color: #202124;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.75px;
  line-height: 16px;
  text-decoration: none;
  text-transform: uppercase;
  margin: 8px;
`;

const ContentContainer = styled.div`
  transition: opacity ease-out 200ms;
  background: #fff;
  margin-top: -4px;
`;

const FadeIn = styled.div<any>`
  transition: opacity 500ms;
  opacity: ${props => (props.in ? 1 : 0)};
`;

const ImagePage: React.StatelessComponent<ImageProps> = ({ src, title, onClick }) => (
  <BabaManager name={title}>
    {props => (
      <ImagePageRoot>
        <IconButton
          color="default"
          aria-label="Menu"
          style={{ top: 0, left: 0, position: 'absolute', ...props.style }}
          onClick={onClick}
        >
          <BackIcon color="inherit" />
        </IconButton>

        <Baba name={title}>
          <FLIPMove>
            {({ ref, style }) => <PageImage src={src} innerRef={ref} style={style} />}
          </FLIPMove>
        </Baba>

        <ContentContainer {...props}>
          <FadeIn in={props.style.visibility !== 'hidden'}>
            <MetaRoot>
              <PageTitle>{title}</PageTitle>
              <Copyright>Images may be subject to copyright.</Copyright>
            </MetaRoot>

            <Images>
              <Related>Related images</Related>
              <Related>See more</Related>
            </Images>

            <Images>
              <Column>
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
              </Column>
              <Column>
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
              </Column>
            </Images>
          </FadeIn>
        </ContentContainer>
      </ImagePageRoot>
    )}
  </BabaManager>
);

storiesOf('Example/GoogleImageSearch', module).add('Default', () => (
  <Toggler>
    {({ toggle, shown }) => (
      <Container>
        <Header>
          <IconButton color="default" aria-label="Menu" style={{ marginRight: '10px' }}>
            <MenuIcon />
          </IconButton>

          <Logo />
        </Header>

        <SearchForm />
        <Tags />
        <PillContainer>
          <Pill>
            <span>alex ovechkin</span>
          </Pill>
          <Pill>
            <span>blue jackets</span>
          </Pill>
          <Pill>
            <span>maple leafs</span>
          </Pill>
          <Pill>
            <span>stanley cup</span>
          </Pill>
        </PillContainer>

        <Images>
          <Column>
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
          </Column>
          <Column>
            <Image
              src={require('./images/4.png')}
              title="Washington Capitals - Wikipedia"
              from="en.wikipedia.org"
              onClick={toggle}
              in={!shown}
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
          </Column>
        </Images>

        {shown && (
          <ImagePage
            src={require('./images/4.png')}
            title="Washington Capitals - Wikipedia"
            from="en.wikipedia.org"
            onClick={toggle}
          />
        )}
      </Container>
    )}
  </Toggler>
));

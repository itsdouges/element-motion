import * as React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import BackIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

import Toggler from '../../test/Toggler';
import Baba, { BabaManager, CrossFadeMove } from '../../src';

const Container = styled.div`
  min-height: 120vh;
  padding-top: 200px;
  position: relative;
  background-color: #fbfbfb;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;

  * {
    box-sizing: border-box;
  }
`;

const Cards = styled.div`
  padding-top: 110px;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: repeat(3, auto);
  grid-gap: 16px;
  max-width: 800px;
  margin: 0 auto;
`;

const Card = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 1px 40px rgba(32, 33, 36, 0.1);
  background-color: #fff;
  border-radius: 3px;
  z-index: 1;
`;

const CardContainer = styled.div`
  position: relative;
  height: 130px;
  z-index: 1;
  transition: transform ease-in-out 200ms, box-shadow ease-in-out 100ms;
  cursor: pointer;
  font-family: Roboto, sans-serif;

  :hover {
    box-shadow: 0 1px 50px rgba(32, 33, 36, 0.2);
    transform: translateY(-2px);
  }
`;

const CardContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 8px;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 999;
`;

const ContentCardContainer = styled.div`
  width: 600px;
  height: 100vh;
  z-index: 1;
  margin: 0 auto;
  position: relative;

  * {
    box-sizing: border-box;
  }
`;

const ContentInnerCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

const ContentCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 50px rgba(32, 33, 36, 0.2);
  font-family: Roboto, sans-serif;
`;

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: #3c71ca;
  background-image: url('https://cdn.vox-cdn.com/thumbor/vQ3jAr1UBy_9fC4Fhz2Ao6tFBTw=/0x0:3000x2000/1820x1213/filters:focal(1883x395:2363x875):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/60002177/OvechkinWins_Getty_Ringer.0.jpg');
  background-size: cover;
  background-position: top center;
  z-index: 0;
`;

const Background = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  height: 400px;
  background-color: #cf132b;
  background-image: url('https://cdn.vox-cdn.com/thumbor/vQ3jAr1UBy_9fC4Fhz2Ao6tFBTw=/0x0:3000x2000/1820x1213/filters:focal(1883x395:2363x875):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/60002177/OvechkinWins_Getty_Ringer.0.jpg');
  background-size: cover;
  background-position: top center;
`;

const ImageContainer = styled.div`
  margin: 0 16px;
  width: 125px;
  height: 100px;
  background-color: #f1f1f1;
  flex-shrink: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BigImageContainer = styled(ImageContainer)`
  width: 100%;
  height: 266px;
  margin: 0;
  border-radius: 3px 3px 0 0;
`;

const Title = styled.div`
  font-size: 20px;
  font-family: Roboto, sans-serif;
  margin: 16px;
  text-align: center;
  text-transform: uppercase;
`;

const ChampionsText = styled.div`
  position: absolute;
  top: 400px;
  left: 0;
  right: 0;
  text-transform: uppercase;
  color: #fff;
  display: flex;
  justify-content: space-between;
  font-size: 200px;
  width: 100%;
  overflow: hidden;
  flex-wrap: wrap;
  padding: 20px;
  pointer-events: none;
  font-weight: bold;
`;

const cards = [
  {
    name: 'Alexander Ovechkin',
    image: require('./images/players/ovechkin.jpg'),
  },
  {
    name: 'T.J Oshie',
    image: require('./images/players/oshie.jpeg'),
  },
  {
    name: 'Braden Holtby',
    image: require('./images/players/holtby.jpg'),
  },
  {
    name: 'Nathan Walker',
    image: require('./images/players/walker.jpg'),
  },
  {
    name: 'Nicklas Backstrom',
    image: require('./images/players/backstrom.jpg'),
  },
  {
    name: 'Evgeny Kuznetsov',
    image: require('./images/players/kuznetsov.jpg'),
  },
  {
    name: 'Devante Smith-Pelly',
    image: require('./images/players/pelly.jpg'),
  },
  {
    name: 'Lars Eller',
    image: require('./images/players/eller.jpg'),
  },
  {
    name: 'John Carlson',
    image: require('./images/players/carlson.jpg'),
  },
];

storiesOf('Examples/Cards', module).add('cross fade move', () => (
  <Toggler>
    {({ shown, toggle, set }) => (
      <Container>
        {!!shown || (
          <Cards>
            {cards.map((card, index) => (
              <CardContainer key={index} onClick={() => set(`${index}`)}>
                <BabaManager>
                  {props => (
                    <>
                      <Baba name={`${index}-card`}>
                        <CrossFadeMove zIndex={999}>
                          {({ style, ref }) => <Card style={style} innerRef={ref} />}
                        </CrossFadeMove>
                      </Baba>

                      <CardContent {...props}>
                        <Baba name={`${index}-card-image`}>
                          <CrossFadeMove zIndex={1000}>
                            {({ style, ref }) => (
                              <ImageContainer style={style} innerRef={ref}>
                                <Image src={card.image} />
                              </ImageContainer>
                            )}
                          </CrossFadeMove>
                        </Baba>

                        {card.name}
                      </CardContent>
                    </>
                  )}
                </BabaManager>
              </CardContainer>
            ))}
          </Cards>
        )}

        {!!shown && (
          <ContentCardContainer>
            <BabaManager>
              {props => (
                <>
                  <ContentInnerCard {...props}>
                    <IconButton
                      color="default"
                      aria-label="Menu"
                      style={{ top: 5, left: 5, position: 'absolute', ...props.style }}
                      onClick={toggle}
                    >
                      <BackIcon color="inherit" />
                    </IconButton>

                    <Baba name={`${shown}-card-image`}>
                      <CrossFadeMove zIndex={1000}>
                        {({ style, ref }) => (
                          <BigImageContainer style={style} innerRef={ref}>
                            <Image src={cards[typeof shown === 'string' ? shown : 0].image} />
                          </BigImageContainer>
                        )}
                      </CrossFadeMove>
                    </Baba>

                    <Title>{cards[typeof shown === 'string' ? shown : 0].name}</Title>
                  </ContentInnerCard>

                  <Baba name={`${shown}-card`}>
                    <CrossFadeMove zIndex={999}>
                      {({ style, ref }) => <ContentCard style={style} innerRef={ref} />}
                    </CrossFadeMove>
                  </Baba>
                </>
              )}
            </BabaManager>
          </ContentCardContainer>
        )}

        <BackgroundContainer>
          <Background />
        </BackgroundContainer>

        <ChampionsText>
          {'Stanley Cup Champs'.split('').map(char => (
            <span key={char}>{char}</span>
          ))}
        </ChampionsText>
      </Container>
    )}
  </Toggler>
));

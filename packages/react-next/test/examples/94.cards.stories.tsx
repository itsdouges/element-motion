import * as React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import BackIcon from '@material-ui/icons/Close';
import { IconButton } from 'material-ui';

import Toggler from '../../test/Toggler';
import Baba, { BabaManager, Move } from '../../src';

const Container = styled.div`
  min-height: 120vh;
  padding-top: 200px;
  position: relative;
  background-color: #fbfbfb;
  box-sizing: border-box;

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
  right: 0;
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
  background-color: #ccc;
  flex-shrink: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BigImageContainer = ImageContainer.extend`
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
`;

const cards = [
  {
    name: 'Alexander Ovechkin',
    image:
      'https://assets3.sportsnet.ca/wp-content/uploads/2018/06/ovechkin-lifts-stanley-cup-1024x576.jpg',
  },
  {
    name: 'T.J Oshie',
    image:
      'https://storage.googleapis.com/afs-prod/media/media:ad9273c82ed54801ba46fef9e4c3e939/800.jpeg',
  },
  {
    name: 'Braden Holtby',
    image:
      'http://starsandsticks.com/files/2015/06/braden-holtby-nhl-stanley-cup-playoffs-new-york-rangers-washington-capitals.jpg',
  },
  {
    name: 'Nathan Walker',
    image: 'https://d3p157427w54jq.cloudfront.net/uploads/2018/06/walker-caps-636x397.jpg',
  },
  {
    name: 'Nicklas Backstrom',
    image:
      'https://media.gettyimages.com/photos/alex-ovechkin-of-the-washington-capitals-and-teammate-nicklas-lift-picture-id969525996?k=6&m=969525996&s=612x612&w=0&h=HyHCIx89QPrKaYmf3tfDpvB4zGZ4R4RE_68iW6u2nZk=',
  },
  {
    name: 'Evgeny Kuznetsov',
    image: 'https://assets1.sportsnet.ca/wp-content/uploads/2017/04/evgeny-kuznetsov.jpg',
  },
  {
    name: 'Devante Smith-Pelly',
    image:
      'https://www.washingtonpost.com/resizer/fZPwycjXbmghcdhuV0qCL_KQVxU=/480x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/VAKU43HZ444WHEC3NK5ZI2UJDE.jpg',
  },
  {
    name: 'Lars Eller',
    image:
      'https://postmediamontrealgazette2.files.wordpress.com/2018/06/969467722.jpg?quality=80&strip=all&w=840&h=630&crop=1',
  },
  {
    name: 'John Carlson',
    image: 'http://capitalsoutsider.com/wp-content/uploads/2015/11/caps-241-610x400.jpg',
  },
];

storiesOf('Examples/Cards', module).add('list to content', () => (
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
                        <Move zIndex={999}>
                          {({ style, ref }) => <Card style={style} innerRef={ref} />}
                        </Move>
                      </Baba>

                      <CardContent {...props}>
                        <Baba name={`${index}-card-image`}>
                          <Move zIndex={1000}>
                            {({ style, ref }) => (
                              <ImageContainer style={style} innerRef={ref}>
                                <Image src={card.image} />
                              </ImageContainer>
                            )}
                          </Move>
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
                      style={{ top: 0, left: 0, position: 'absolute', ...props.style }}
                      onClick={toggle}
                    >
                      <BackIcon color="inherit" />
                    </IconButton>

                    <Baba name={`${shown}-card-image`}>
                      <Move zIndex={1000}>
                        {({ style, ref }) => (
                          <BigImageContainer style={style} innerRef={ref}>
                            <Image src={cards[typeof shown === 'string' ? shown : 0].image} />
                          </BigImageContainer>
                        )}
                      </Move>
                    </Baba>

                    <Title>{cards[typeof shown === 'string' ? shown : 0].name}</Title>
                  </ContentInnerCard>

                  <Baba name={`${shown}-card`}>
                    <Move zIndex={999}>
                      {({ style, ref }) => <ContentCard style={style} innerRef={ref} />}
                    </Move>
                  </Baba>
                </>
              )}
            </BabaManager>
          </ContentCardContainer>
        )}

        <BackgroundContainer>
          <Background />
        </BackgroundContainer>
      </Container>
    )}
  </Toggler>
));

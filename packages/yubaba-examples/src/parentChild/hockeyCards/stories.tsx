import * as React from 'react';
import { storiesOf } from '@storybook/react';
import BackIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { Toggler } from 'yubaba-common';
import Baba, { BabaManager, CrossFadeMove } from 'yubaba';
import * as Styled from './styled';
import { cards } from './data';

storiesOf('yubaba-examples/ParentChild/Cards', module).add('Default', () => (
  <Toggler>
    {({ shown, toggle, set }) => (
      <Styled.Container>
        {!!shown || (
          <Styled.Cards>
            {cards.map((card, index) => (
              <Styled.CardContainer key={index} onClick={() => set(`${index}`)}>
                <BabaManager>
                  {props => (
                    <>
                      <Baba name={`${index}-card`}>
                        <CrossFadeMove zIndex={999}>
                          {({ style, ref }) => <Styled.Card style={style} innerRef={ref} />}
                        </CrossFadeMove>
                      </Baba>

                      <Styled.CardContent {...props}>
                        <Baba name={`${index}-card-image`}>
                          <CrossFadeMove zIndex={1000}>
                            {({ style, ref }) => (
                              <Styled.ImageContainer style={style} innerRef={ref}>
                                <Styled.Image src={card.image} />
                              </Styled.ImageContainer>
                            )}
                          </CrossFadeMove>
                        </Baba>

                        {card.name}
                      </Styled.CardContent>
                    </>
                  )}
                </BabaManager>
              </Styled.CardContainer>
            ))}
          </Styled.Cards>
        )}

        {!!shown && (
          <Styled.ContentCardContainer>
            <BabaManager>
              {props => (
                <>
                  <Styled.ContentInnerCard {...props}>
                    <IconButton
                      color="default"
                      aria-label="Menu"
                      style={{ top: 5, left: 5, position: 'absolute', ...props.style }}
                      onClick={() => toggle()}
                    >
                      <BackIcon color="inherit" />
                    </IconButton>

                    <Baba name={`${shown}-card-image`}>
                      <CrossFadeMove zIndex={1000}>
                        {({ style, ref }) => (
                          <Styled.BigImageContainer style={style} innerRef={ref}>
                            <Styled.Image
                              src={cards[typeof shown === 'string' ? shown : 0].image}
                            />
                          </Styled.BigImageContainer>
                        )}
                      </CrossFadeMove>
                    </Baba>

                    <Styled.Title>{cards[typeof shown === 'string' ? shown : 0].name}</Styled.Title>
                  </Styled.ContentInnerCard>

                  <Baba name={`${shown}-card`}>
                    <CrossFadeMove zIndex={999}>
                      {({ style, ref }) => <Styled.ContentCard style={style} innerRef={ref} />}
                    </CrossFadeMove>
                  </Baba>
                </>
              )}
            </BabaManager>
          </Styled.ContentCardContainer>
        )}

        <Styled.BackgroundContainer>
          <Styled.Background />
        </Styled.BackgroundContainer>

        <Styled.ChampionsText>
          {'Stanley Cup Champs'.split('').map(char => (
            <span key={char}>{char}</span>
          ))}
        </Styled.ChampionsText>
      </Styled.Container>
    )}
  </Toggler>
));

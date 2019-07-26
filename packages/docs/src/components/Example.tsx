import * as React from 'react';
import styled from 'styled-components';
import { components } from 'docz-theme-default';
import { Link } from 'docz';
import { mix } from 'polished';

const padding = 20;
const exampleBackground = [
  '#FFC400',
  mix(0.5, '#FFC400', '#FF991F'),
  '#FF991F',
  mix(0.5, '#FF991F', '#FF5630'),
  '#FF5630',
  mix(0.5, '#FF5630', '#BF2600'),
  '#BF2600',
  mix(0.5, '#BF2600', '#0747A6'),
  mix(0.75, '#BF2600', '#0747A6'),
  '#0747A6',
];

const ContainerBlock = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${padding}px;
  background: ${props => props.background};
  position: relative;

  > div {
    margin: 0;
  }
`;

const Container = styled.div<any>`
  display: flex;
  background-color: #898fa82b;
  box-sizing: border-box;
  border-radius: 3px;
  overflow: hidden;
  flex-direction: column;

  @media screen and (min-width: 1086px) {
    flex-direction: ${props => props.direction};
  }

  ${ContainerBlock} {
    @media screen and (min-width: 1086px) {
      width: ${props => (props.direction === 'row' ? '50%' : '')};
    }

    :first-child {
      min-height: 300px;

      @media screen and (min-width: 1086px) {
        min-height: ${props => (props.direction === 'row' ? '' : '300px')};
      }
    }
  }

  * {
    box-sizing: border-box;
  }

  > :first-child {
    padding-right: ${padding}px;
  }

  > :last-child {
    padding-left: ${padding}px;
  }
`;

const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 8px !important;
  justify-content: flex-end;
`;

const StyledLink = styled<any>(Link)`
  border-radius: 3px;
  margin-left: 8px;
  background-color: ${props => props.backgroundColor};
  color: rgba(255, 255, 255, 0.85);
  padding: 4px 8px;
  font-size: 0.8em;
  font-weight: 500;
  text-decoration: none;
  transition: opacity ease-in-out 100ms;

  :after {
    content: ' ›';
  }

  :hover,
  :focus {
    opacity: 0.7;
  }

  :active {
    opacity: 0.5;
  }
`;

interface ExampleProps {
  children: React.ReactNode;
  code?: string;
  to?: string;
  codesandbox?: string;
  direction?: 'row' | 'column';
}

let count = -1;

export const Example = ({ children, code, to, codesandbox, direction = 'row' }: ExampleProps) => {
  count++;
  const color = exampleBackground[count % exampleBackground.length];

  return (
    <Container direction={direction} style={{ '--color': color }}>
      <ContainerBlock background={color}>{children}</ContainerBlock>
      {code && (
        <ContainerBlock>
          <components.pre>{code.replace(/^\n/, '')}</components.pre>
          {(to || codesandbox) && (
            <LinkContainer>
              {to && (
                <StyledLink to={to} backgroundColor={color}>
                  View docs
                </StyledLink>
              )}
              {codesandbox && (
                <StyledLink as="a" target="_blank" href={codesandbox} backgroundColor={color}>
                  Open in CodeSandbox
                </StyledLink>
              )}
            </LinkContainer>
          )}
        </ContainerBlock>
      )}
    </Container>
  );
};

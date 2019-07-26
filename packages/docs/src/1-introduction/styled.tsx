import * as React from 'react';
import BodyClassName from 'react-body-classname';
import styled from 'styled-components';
import { Link } from 'docz';

export const FullPageContainer = styled(BodyClassName)`
  [class^='Page__Wrapper-'] {
    max-width: 800px;
    padding: 16px;
    margin: 0 auto;
  }

  p {
    font-size: 21px;
  }

  [class^='Editor__Wrapper-'] {
    border: none;
  }

  .CodeMirror-linenumber,
  .CodeMirror-gutters,
  .CodeMirror-linenumbers,
  .CodeMirror {
    background-color: transparent !important;
  }

  ul {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.75);
  }
`;

export const BreakOut = styled.div`
  @media screen and (min-width: 1086px) {
    margin: 0 -100px 100px;
  }

  @media screen and (min-width: 1300px) {
    margin: 0 -152px 100px;
  }
`;

export const Title = styled.h1.attrs(props => ({ id: props.children }))`
  font-weight: 600;
  font-size: 72px;
  margin-top: 200px;
  margin-bottom: 8px;
  line-height: 1;
`;

export const Subtitle = styled.p`
  margin-top: 0;
  font-size: 26px !important;
  font-weight: 400;
`;

export const Emphasize = styled.strong`
  font-weight: 600;
`;

export const StyledLink = styled(Link)`
  font-size: 26px;
  text-decoration: none;
  font-weight: 600;
  color: ${props => props.color || '#f6c443'};

  :after {
    content: ' ›';
  }

  :hover,
  :focus {
    text-decoration: underline;
  }
`;

export const SectionTitle = styled.h2.attrs(props => ({ id: `${props.children}`.toLowerCase() }))`
  font-size: 32px;
  margin-bottom: 8px;
  line-height: 1.3;
`;

export const ExampleTitle = styled.h3`
  font-size: 28px;
  margin-top: 64px;
  margin-bottom: 8px;
`;

export const CtaGroup = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export const LinkGroup = styled.div`
  margin-bottom: 75px;

  > ${StyledLink} {
    margin-right: 24px;
  }
`;

const HeroPointContent = styled.div``;
const HeroPointCode = styled.div``;

const HeroPointContainer = styled.div<any>`
  margin: 150px 0;

  a {
    display: inline-block;
    margin-bottom: 28px;
  }

  @media screen and (min-width: 1086px) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    > :first-child {
      margin-right: 24px;
    }

    > :last-child {
      margin-left: 24px;
    }

    > ${HeroPointContent} {
      width: 45%;
      flex-shrink: 0;
      order: ${props => (props.flip ? 1 : 0)};
      margin: ${props => (props.flip ? '0 0 0 24px' : '0 24px 0 0')};
    }

    > ${HeroPointCode} {
      width: 55%;
      flex-shrink: 0;
      order: ${props => (props.flip ? 0 : 1)};
      margin: ${props => (props.flip ? '0 24px 0 0' : '0 0 0 24px')};
    }
  }
`;

interface HeroPointProps {
  section: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  more: string;
  flip?: boolean;
}

export const HeroPoint: React.FC<HeroPointProps> = ({
  title,
  subtitle,
  children,
  more,
  flip,
}: HeroPointProps) => {
  const content = (
    <HeroPointContent>
      <SectionTitle>{title}</SectionTitle>
      <Subtitle>{subtitle}</Subtitle>
      <StyledLink to={more}>Learn more</StyledLink>
    </HeroPointContent>
  );
  const code = <HeroPointCode>{children}</HeroPointCode>;

  return (
    <BreakOut>
      <HeroPointContainer flip={flip}>
        {content}
        {code}
      </HeroPointContainer>
    </BreakOut>
  );
};

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Center = styled.div`
  > * {
    margin: 0 auto;
  }
`;

export const Root = styled.div`
  width: 100px;
  height: 100px;
  background: #fea3aa;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

export const PlayerCard = styled.div``;

export const PlayerImage = styled.img``;

export const PlayerBio = styled.div<{ isExpanded: boolean }>`
  height: ${props => (props.isExpanded ? 'auto' : '0')};
  overflow: hidden;
`;

export const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Screen = styled.main`
  box-shadow: 0 1px 40px rgba(32, 33, 36, 0.15);
  background-color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

export const LightLink = styled(Link)`
  color: white;
`;

export const data = [
  {
    iconUrl: '',
    title: 'Brunch this weekend?',
    recipients: 'Ali Connors',
    body: `I'll be in your neighbourhood soon and I think it'd be great to catch up!`,
  },
  {
    iconUrl: '',
    title: 'Oui Oui',
    recipients: 'Sandra Adams',
    body: `Do you have paris recorded?`,
  },
  {
    iconUrl: '',
    title: 'Summer BBQ',
    recipients: 'to Jonas, Scott, Jennifer',
    body: `Hi Friends,

I was at the grocery store on Sunday night... when I ran into Genie Williams! I almost didn't recognise her after 20 years!`,
  },
  {
    iconUrl: '',
    title: 'Birthday Gift',
    recipients: 'Trevor Hansen',
    body: `Have any ideas about that thing?`,
  },
  {
    iconUrl: '',
    title: 'Brunch this weekend?',
    recipients: 'Ali Connors',
    body: `I'll be in your neighbourhood soon and I think it'd be great to catch up!`,
  },
  {
    iconUrl: '',
    title: 'Oui Oui',
    recipients: 'Sandra Adams',
    body: `Do you have paris recorded?`,
  },
  {
    iconUrl: '',
    title: 'Summer BBQ',
    recipients: 'to Jonas, Scott, Jennifer',
    body: `Hi Friends,

I was at the grocery store on Sunday night... when I ran into Genie Williams! I almost didn't recognise her after 20 years!`,
  },
  {
    iconUrl: '',
    title: 'Birthday Gift',
    recipients: 'Trevor Hansen',
    body: `Have any ideas about that thing?`,
  },
  {
    iconUrl: '',
    title: 'Brunch this weekend?',
    recipients: 'Ali Connors',
    body: `I'll be in your neighbourhood soon and I think it'd be great to catch up!`,
  },
  {
    iconUrl: '',
    title: 'Oui Oui',
    recipients: 'Sandra Adams',
    body: `Do you have paris recorded?`,
  },
  {
    iconUrl: '',
    title: 'Summer BBQ',
    recipients: 'to Jonas, Scott, Jennifer',
    body: `Hi Friends,

I was at the grocery store on Sunday night... when I ran into Genie Williams! I almost didn't recognise her after 20 years!`,
  },
  {
    iconUrl: '',
    title: 'Birthday Gift',
    recipients: 'Trevor Hansen',
    body: `Have any ideas about that thing?`,
  },
];

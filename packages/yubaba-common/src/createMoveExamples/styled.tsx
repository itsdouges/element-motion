import styled, { css } from 'styled-components';
import * as Common from '../index';

export const RestoreScrollOnMount = Common.createRestoreScrollOnMount();

interface ListItemProps {
  margin?: number;
  alternate?: boolean;
  size?: number;
  width?: number;
  height?: number;
  borderRadius?: string;
}

export const ListItem = styled.button<ListItemProps>`
  font-size: ${props => props.size || 1}em;
  margin: ${props => props.margin || 0}px;
  height: ${props => (props.height || 1) * 10}em;
  width: ${props => (props.width || 1) * 10}em;
  border-radius: ${props => props.borderRadius};
  background: #fea3aa;
  position: relative;
  cursor: pointer;
  border: none;

  &:before {
    content: 'click me';
    text-align: center;
    left: 0;
    right: 0;
    position: absolute;
    color: white;
    font-family: Roboto, HelveticaNeue, Arial, sans-serif;
    top: 75%;
    font-size: 1em;
  }

  &:after {
    content: '😊';
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5em;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    pointer-events: none;
  }

  ${props =>
    props.alternate
      ? css`
          background: #b2cefe;

          &:after {
            content: '😳';
          }
        `
      : ''};
`;

export const ListItemContainer = styled.div`
  display: flex;
  align-items: center;
  background: #baed91;
  height: 500px;
  width: 500px;
`;

export const ListItemFloatingRight = styled(ListItem)`
  float: right;
`;

export const ListItemFillSpace = styled(ListItem)`
  height: 100%;
  width: 100%;
  position: absolute;
`;

export const Padding = styled.div`
  height: 90vh;
`;

export const LongContainer = styled.div`
  padding-top: 50vh;
  height: 150vh;
`;

export const ContainerFloatingRight = styled.div`
  font-size: 1em;
  height: 10em;
  width: 10em;
  position: relative;
  float: right;
`;

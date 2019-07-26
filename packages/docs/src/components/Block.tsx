import styled, { css } from 'styled-components';

const checkeredMixin = () => css`
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
`;

export const Fill = styled.div`
  position: absolute;
  top: 0%;
  left: 0;
  right: 0;
  bottom: 0%;
  transition: opacity ease-out 150ms;
  background-color: #d2443f78;
  z-index: 0;
`;

export const Block = styled.div<any>`
  display: flex;
  align-items: center;
  font-size: 25px;
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  border-radius: ${props => props.borderRadius || '3px'};
  width: ${props => props.width || '150px'};
  height: ${props => props.height || '150px'};
  flex-direction: column;
  background-color: ${props => props.background || '#fff'};
  align-self: ${props => props.alignSelf || 'flex-start'};
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  overflow: ${props => props.overflow};
  ${props => (props.background === 'checkered' ? checkeredMixin() : '')};
  color: var(--color);
  justify-content: ${props => props.justifyContent};
  z-index: 1;
`;

export const InnerBlock = styled.div<any>`
  width: ${props => props.width || '50%'};
  height: ${props => props.height || '50%'};
  align-self: flex-start;
  border-radius: 3px;
  z-index: 2;

  ${props =>
    props.fill &&
    css`
      width: 100%;
      height: 100%;
    `}

  ${props =>
    props.background === 'checkered'
      ? checkeredMixin()
      : css`
          background-color: #f6c443;
        `};
`;

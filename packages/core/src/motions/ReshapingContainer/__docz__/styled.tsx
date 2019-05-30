import styled from 'styled-components';

const anim = {
  entering: 'scale(0.75)',
  entered: 'none',
  exiting: 'scale(0.75)',
};

const opac = {
  entering: 0,
  entered: 1,
  exiting: 0,
};

const pos = {
  exiting: 'absolute',
};

export const InnerMenu = styled.div<{ state: string }>`
  opacity: ${props => opac[props.state]};
  position: ${props => pos[props.state]};
  top: 0;
`;

export const ContainerPositioning = styled.div<{ state: string }>`
  transition: transform 0.2s, opacity 0.2s;
  transform-origin: 50% 0;
  transform: ${props => anim[props.state]};
  opacity: ${props => opac[props.state]};
`;

export const Container = styled.div`
  padding: 50px;
  height: 300px;
  position: relative;
  overflow: hidden;
`;

export const Header = styled.header`
  display: flex;
  position: relative;
  align-items: center;

  > :first-child {
    margin-right: auto;
    color: white;
    font-size: 30px;
    flex-shrink: 0;
  }
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(150deg, #53f 15%, #05d5ff 70%, #a6ffcb 94%);
  position: absolute;
  top: 0;
  left: 0;
`;

export const MenuLink = styled.a`
  font-weight: 500;
  padding: 0 25px;
  height: 50px;
  font-size: 17px;
  line-height: 50px;
  outline: none;
  color: #fff;
  transition: color 0.1s ease;
  text-decoration: none;

  &:hover,
  &:focus {
    color: hsla(0, 0%, 100%, 0.5);
  }
`;

export const Menu = styled.ul`
  position: relative;
  padding: 0 20px;
  margin: 0;
`;

export const MenuItem = styled.li`
  display: block;
  padding: 9px 0;
  outline: none;
  position: relative;
  list-style: none;
  transition: color 0.1s;
  color: #6772e5;
  margin: 0;
  text-transform: uppercase;

  &:hover,
  &:focus {
    color: #32325d;
  }

  small {
    display: block;
    color: #6b7c93;
    text-transform: none;
  }
`;

import ReactDOM from 'react-dom';
import MoveFrom from 'components/MoveFrom';
import MoveTo from 'components/MoveTo';
import Thumbnail from '../../components/Thumbnail';
import App from '../../components/App';
import React from 'react';

const element = document.createElement('div');
document.body.appendChild(element);

const children = (
  <div>
    <MoveFrom transitionKey="1">
      <Thumbnail src="https://i.ytimg.com/vi/ngElkyQ6Rhs/hqdefault.jpg" label="from element" />
    </MoveFrom>

    <MoveTo transitionKey="1">
      <Thumbnail src="https://i.ytimg.com/vi/ngElkyQ6Rhs/hqdefault.jpg" position="bottom" label="to element" />
    </MoveTo>
  </div>
);

ReactDOM.render(<App children={children} />, element);

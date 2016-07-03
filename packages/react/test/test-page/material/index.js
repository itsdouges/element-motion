import ReactDOM from 'react-dom';
import App from './App';
import Home from './views/Home';
import Article from './views/Article';

import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="article/:type" component={Article} />
    </Route>
  </Router>,
  document.getElementById('root')
);

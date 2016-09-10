import React from 'react';
import ReactDOM from 'react-dom';

import Header from './header/header';
import FrontPage from './frontPage/frontPage';

import './main.scss';

class App extends React.Component {
  render() {
    return(
      <div id="body">
        <Header />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));

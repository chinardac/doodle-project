import React from 'react';
import ReactDOM from 'react-dom';

import Header from './header/header';
import FrontPage from './frontPage/frontPage';
import moviesActions from './actions/moviesActions';
import moviesStore from './stores/moviesStore';

import './main.scss';

class App extends React.Component {
  componentDidMount() {
    moviesStore.listen(this.onChange);
    moviesActions.getAllMovies();
  }

  onChange = (state) => {
    console.log(state);
  }

  render() {
    return(
      <div id="body">
        <Header />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));

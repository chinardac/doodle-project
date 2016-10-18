import dispatcher from '../dispatcher';
import moviesActions from '../actions/moviesActions';

class MoviesStore {
  constructor() {
    this.state = {
      movies: {}
    }

    this.bindListeners({
      handleGetAllMovies: moviesActions.GET_ALL_MOVIES
    });
  }

  handleGetAllMovies(movies) {
    this.state.movies = movies;
  }
}

export default dispatcher.createStore(MoviesStore, 'MoviesStore');

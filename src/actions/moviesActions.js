import dispatcher from '../dispatcher';
import { getAllMovies } from '../apiUtils/moviesApiUtils';

class MoviesActions {
  getAllMovies() {
    return (dispatch) => {
      getAllMovies()
        .then((response) => {
          dispatch(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}

export default dispatcher.createActions(MoviesActions);

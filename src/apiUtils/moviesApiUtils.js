import api from './baseApi';

export function getAllMovies() {
  return new Promise((resolve, reject) => {
    api.get('/api/movies')
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

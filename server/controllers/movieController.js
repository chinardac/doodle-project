import _ from 'lodash';
import axios from 'axios';

const movieController = {
  getMovies: (req, res, next) => {
    req.db.collection('imdbMovies').aggregate([{$limit: 10}]).toArray((err, results) => {
      res.json(results);
    });
  }
};

export default movieController;

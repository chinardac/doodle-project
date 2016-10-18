const env = {};

env.cinemalytics = {
  token: '65E96E43794A11ECA130C3CFB1EB8318',
  hostname: 'api.cinemalytics.com',
  pathname: '/v1',
  protocol: 'https:'
};

env.omdbApi = {
  protocol: 'http:',
  hostname: 'www.omdbapi.com',
  token: '236ffef2',
  pathname: '/'
}

env.express = {
  protocol: "http",
  hostname: "localhost",
  port: "52671"
};

env.webpack = {
  protocol: "http",
  hostname: "localhost",
  port: "3030"
};

env.mongo = {
  username: "chinar.dac",
  password: "8800578234"
}

env.getConfigUrl = (config) => {
  return `${config.protocol}://${config.hostname}:${config.port}${config.path ? `${config.path}` : ``}`;
};

env.getMongoUrl = () => {
  return `mongodb://${env.mongo.username}:${env.mongo.password}@ds021346.mlab.com:21346/doodle`;
};

module.exports = env;

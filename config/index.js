import path from 'path';
//import environment from './environment.js';

const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  pathBase: path.resolve(__dirname, '..'),
  dirSite: 'src',
  dirPublic: 'public',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  serverHost: 'localhost',
  serverPort: process.env.PORT || 52671,
  serverProtocol: process.env.PROTOCOL || 'http:',
  sessionSecret: 'ChinarDoodle',

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compilerDevtool: 'source-map',
  compilerHashType: 'hash',
  compilerPublicPath: '/',
  compilerVendor: [
    'react',
    'react-redux',
    'redux'
  ]
};

// ------------------------------------
// Environment
// ------------------------------------
config.globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(config.env)
  },
  NODE_ENV: config.env,
  __DEV__: config.env === 'development',
  __PROD__: config.env === 'production',
  __TEST__: config.env === 'test',
  __DEBUG__: config.env === 'development',
  __BASENAME__: JSON.stringify(process.env.BASENAME || ''),
  __iconPrefix__: JSON.stringify('icon')
};

//Object.assign(config, environment);

// ------------------------------------
// Utilities
// ------------------------------------
const resolve = path.resolve;

const base = (...args) => Reflect.apply(resolve, null, [config.pathBase, ...args]);

config.utilsPaths = {
  base,
  site: base.bind(null, config.dirSite),
  public: base.bind(null, config.dirPublic)
};

export default config;

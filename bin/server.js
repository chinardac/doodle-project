import appServer from '../server/main';
import _debug from 'debug';

const debug = _debug('app:bin:server');
const port = 3000;
const host = 'localhost';

appServer.listen(port);
debug(`Server is now running at http://${host}:${port}.`);
debug(`Server accessible via localhost:${port} if you are using the project defaults.`);
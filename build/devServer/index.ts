global.__dirname = `${process.cwd()}/dist`;
global.__filename = `${process.cwd()}/dist/server.js`;

import eventHandler from '../../server/lambda';
import mockAlb from './mockAlb';

const mockAlbApp = mockAlb(eventHandler);

export default mockAlbApp;
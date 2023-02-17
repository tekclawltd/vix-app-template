global.__dirname = `${process.cwd()}/dist`;
global.__filename = `${process.cwd()}/dist/server.js`;

import { setupExpressApp } from '../../server/lambda';

const mockAlbApp = setupExpressApp();

export default mockAlbApp;

/* eslint-disable import/no-commonjs */
// Serves the app from the production bundle
const mockAlb = require('./mockAlb');
// eslint-disable-next-line import/no-unresolved
const lambdaHandler = require('../dist/server');

mockAlb.default(lambdaHandler.eventHandler);
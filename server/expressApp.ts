/* eslint-disable global-require */
// Keep lambda logic separate from express logic, so that express middleware can be imported into other applications
import express from 'express';
import path from 'path';
import cors from 'cors';
import indexRoute from './indexRoute';
export default async () => {
  const expressApp = express();
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.json());
  expressApp.use(cors());

  expressApp.use('/info', (req, res) => {
    res.send('ok');
  });

  expressApp.use('/admin', (req, res) => {
    res.send('this is admin');
  });

  expressApp.use(indexRoute());
  const staticPath = path.resolve(__dirname, 'static');
  expressApp.use(express.static(staticPath));

  return expressApp;
};

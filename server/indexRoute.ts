import { Router } from 'express';
import path from 'path';
import fs from 'fs';
export default () => {
  const indexPath = path.resolve(__dirname, 'static', './index.html');
  const router: Router = Router();
  router.get('/', async (req, res) => {
    const html = fs.readFileSync(indexPath, 'utf-8');
    res.send(html);
  });
  return router;
};

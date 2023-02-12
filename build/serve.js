// eslint-disable-next-line import/no-unresolved
const lambdaHandler = require('../dist/server');
const colors = require('picocolors');

lambdaHandler.setupExpressApp().then((app) => {
  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => {
    console.log(colors.green(`\n[Mock ALB] listening on http://localhost:${PORT}\n`));
  });
});

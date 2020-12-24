require('dotenv').config();

(async () => {
  const express = require('express');
  const app = express();

  const { init } = require('./integrations/db');
  const { secretsService } = require('./services');
  const cookieParser = require('cookie-parser');

  const secretsData = await secretsService.init();
  await init(secretsData.db);

  app.use(cookieParser(secretsData.cookie));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });

  // CORS
  const cors = require('cors');
  app.use(cors({ origin: '*', credentials: true }));

  app.use(express.json());

  const { controllers } = require('./controllers');
  app.use('/api', controllers);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listening ${port}`);
  });
})();

const express = require('express');
const config = require('./config');
const connectDB = require('./connect-db');
const routers = require('./router');
const app = express();
const useConfig = config(app);

connectDB('mongodb://localhost/b0024');
useConfig();

app.use('/', routers);

app.use(function(req, res) {
  res.status(404).send('404: Page not Found');
});

app.use(function(error, req, res, next) {
  console.log(error);
  res.status(500).send('500: Internal Server Error');
});

app.listen(3000, () => {
  console.log(`Server is running on post: 3000`);  
});

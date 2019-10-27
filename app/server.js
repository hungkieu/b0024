const express = require('express');
const config = require('./config');
const connectDB = require('./connect-db');
const routers = require('./router');
const app = express();
const useConfig = config(app);

connectDB('mongodb://localhost/b0024');
useConfig();

app.use('/', routers);

app.listen(3000, () => {
  console.log(`Server is running on post: 3000`);  
});

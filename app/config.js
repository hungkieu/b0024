const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = (app) => {
  return () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: false,
    }));
    app.use(cookieParser());
    app.use('/static', express.static(path.join(__dirname, 'public')));
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
  };
};

module.exports = config;

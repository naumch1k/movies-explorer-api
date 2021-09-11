const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const errorHandler = require('./middlewares/errorHandler');

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use('/', require('./routes'));

app.use(
  errors(),
  errorHandler,
);

app.listen(PORT);

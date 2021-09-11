const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
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

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/users', require('./routes/users'));

app.use(errorHandler);

app.listen(PORT);

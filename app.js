const express = require('express');
const mongoose = require('mongoose');

const { createUser } = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.post('/signup', createUser);

app.use('/users', require('./routes/users'));

app.listen(PORT);

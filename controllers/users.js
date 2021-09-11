const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ErrorNames = require('../utils/error-names');
const StatusCodes = require('../utils/status-codes');
const { JWT_SECRET } = require('../utils/constants');

const { BadRequestError, UnauthorizedError, ConflictError } = require('../errors/index');

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    throw new BadRequestError();
  }

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => res.status(StatusCodes.CREATED).send(user))
    .catch((err) => {
      if (err.name === ErrorNames.MONGO && err.code === StatusCodes.MONGO_ERROR) {
        throw new ConflictError();
      }
      if (err.name === ErrorNames.VALIDATION) {
        throw new BadRequestError(`Переданы некорректные данные при создании пользователя: ${err}`);
      }
      next(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError();
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
      })
        .send({ token });
    })
    .catch((err) => {
      throw new UnauthorizedError(`${err.message}`);
    })
    .catch(next);
};

module.exports.signOut = (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Кука удалена' });
  next();
};

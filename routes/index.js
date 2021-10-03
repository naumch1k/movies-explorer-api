const router = require('express').Router();

const { createUser, login, signOut } = require('../controllers/users');

const auth = require('../middlewares/auth');
const { validateSignup, validateSignin } = require('../middlewares/validators');

const { NotFoundError } = require('../errors');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);
router.delete('/signout', signOut);

router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.all('*', () => {
  throw new NotFoundError();
});

module.exports = router;

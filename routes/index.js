const router = require('express').Router();

const { createUser, login, signOut } = require('../controllers/users');

const auth = require('../middlewares/auth');
const { validateSignup, validateSignin } = require('../middlewares/validators');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);
router.post('/signout', signOut);

router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;

const router = require('express').Router();

const { createUser, login, signOut } = require('../controllers/users');

const auth = require('../middlewares/auth');

router.post('/signin', login);
router.post('/signup', createUser);
router.post('/signout', signOut);

router.use(auth);
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

module.exports = router;

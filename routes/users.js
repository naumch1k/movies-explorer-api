const router = require('express').Router();
const { getUserById } = require('../controllers/users');

router.get('/:userId', getUserById);

module.exports = router;

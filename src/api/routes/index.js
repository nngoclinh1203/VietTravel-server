//nạp file vào
const userRouter = require('./user');
const historicalSiteRouter = require('./historicalSite');
const commentRouter = require('./comment');
const authRouter = require('./auth');
const { Router } = require('express');

const router = Router();

router.use('/users', userRouter);
router.use('/historicalSites', historicalSiteRouter);
router.use('/comments', commentRouter);
router.use('/auth', authRouter);
router.use('/', (req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});


module.exports = router;

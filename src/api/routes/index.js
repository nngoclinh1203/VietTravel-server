//nạp file vào
const userRouter = require('./user');
const historicalSiteRouter = require('./historicalSite');
const commentRouter = require('./comment');
const authRouter = require('./auth');

function route(app) {
    app.use('/api/users', userRouter);
    app.use('/api/historicalSites', historicalSiteRouter);
    app.use('/api/comments', commentRouter);
    app.use('/api/auth', authRouter);
    app.use('/', (req, res) => {
        res.status(404).json({ message: 'Resource not found' });
    });
    
}

module.exports = route;

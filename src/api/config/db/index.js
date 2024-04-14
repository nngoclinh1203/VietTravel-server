const mongoose = require('mongoose');
async function connect() { //connect tới monggodb
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connect database successfully!!!');
    } catch (error) {
        console.log('Connect database failure!!!')
    }
}
module.exports = {connect};

// Path: src/api/config/db/index.js
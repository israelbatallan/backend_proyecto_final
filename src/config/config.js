require('dotenv').config();
const mongoose = require('mongoose');
const { logger, loggerError } = require('../logs/winston');

const config = {
    mongoDb: {
        url: process.env.MONGO_ATLAS_URL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
}

const ConnectToMongoDB = () => {
    try {
        mongoose.connect(config.mongoDb.url, config.mongoDb.options);
        logger.log("info", "Connected to MongoDB");
    } catch (error) {
        loggerError.log("error", error.message);
    }
};


module.exports = {config, ConnectToMongoDB};
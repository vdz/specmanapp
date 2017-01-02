const env = process.env.NODE_ENV || 'dev';

export const config = require('./config.json')[env];

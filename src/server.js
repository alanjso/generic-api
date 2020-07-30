const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const server = express();
const config = require('config');
require('./utils/schedule');

if (config.get('mongo_db').habilitado) {
    require('./database/mongodb')(config.get('mongo_db').host, config.get('mongo_db').database);
}
if (config.get('postgres').habilitado) {
    require('./database/pgsql');
}

server.use(express.json());
server.use(cors());
server.use('/v1', routes);

module.exports = server;
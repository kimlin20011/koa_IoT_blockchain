const router = require('koa-router')();
const offchain = require('../controllers/offchain');

module.exports = router
    .post('/access_grant', offchain.access_grant)
    .get(`/machineIP`, offchain.machineIP);


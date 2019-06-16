const router = require('koa-router')();
const blockchain = require('../controllers/blockchain');

module.exports = router
    .get('/sub_token', blockchain.sub_token);

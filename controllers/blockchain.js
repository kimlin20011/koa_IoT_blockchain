const sub_token = require('../models/sub_token');

module.exports = {
    async sub_token(ctx) {
       // let formData = ctx.request.body
        let res = {
            result:{},
        };

        let sub_token_result =  await sub_token();
        res.result = sub_token_result;
        ctx.body = res;
    },
};

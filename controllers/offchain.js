const access_grant = require('../models/access_grant');


module.exports = {
    async access_grant(ctx) {
        let data  = {};
        data.msg = ctx.request.body;
        console.log(`iot access_grant`)
        console.log(ctx.request.body)
        data.ip = ctx.request.ip;
        let res = {
            result:{},
        };

        //body = ip,auth_dur
        let access_grant_result =  await access_grant(data);
        res.result = access_grant_result;
        ctx.body = res;
    }

};

const access_grant = require('../models/access_grant');


module.exports = {
    async access_grant(ctx) {
        let data  = {};
        data.msg = ctx.request.body;
        console.log(`iot access_grant`);
        console.log(ctx.request.body);

        if(ctx.request.ip === `::1`){
            data.ip = `127.0.0.1`;
        }else{
            let ip = ctx.request.ip.split(':');
            data.ip = ip[3];
        }


        //data.ip = ctx.request.ip;
        let res = {
            result:{},
        };

        //body = ip,auth_dur
        let access_grant_result =  await access_grant(data);
        res.result = access_grant_result;
        ctx.body = res;
    },
    async machineIP(ctx) {
        let data  = {};
        if(ctx.request.ip === `::1`){
            data.ip = `127.0.0.1`;
        }else{
            let ip = ctx.request.ip.split(':');
            data.ip = ip[3];
        }
        console.log(`getMachineIP:${data.ip}`)
        ctx.body = data.ip;
    }

};

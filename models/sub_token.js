const fs = require('fs');
const config = require('../config/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);

module.exports = async function sub_token() {
    let B_OAuthAbi = config.B_OAuth.abi;
    let B_OAuth = new web3.eth.Contract(B_OAuthAbi);
    B_OAuth.options.address = await fs.readFileSync('./B_OAuth_address.txt').toString();
    console.log(`address: ${B_OAuth.options.address}`);
    B_OAuth.events.tokenRelease({})
        .on('data', (event) => {
            let result = {};
            result.access_token = event.returnValues.access_token;
            result.sender_address = event.returnValues.msg_sender;
            console.log(result);// same results as the optional callback above
           /* fs.writeFileSync('./sub_token.txt', JSON.stringify(result));*/
            let data = JSON.stringify(result);
            fs.writeFileSync('./sub_token.json', data);
        })
        .on('error', (error)=> {
            console.log(error);
    });
    return `start listen event`
};

const fs = require('fs');
const config = require('../config/config');
let gethWebsocketUrl = config.geth.gethWebsocketUrl;
const Web3 = require('web3');
// use the given Provider, e.g in Mist, or instantiate a new websocket provider
const web3 = new Web3(Web3.givenProvider || gethWebsocketUrl);

module.exports = async function sub_token(info) {
    let message ={};
    // read the toke and sender.address data
    let sub_token = JSON.parse(fs.readFileSync('./sub_token.json', 'utf-8'));

    let sender_address =sub_token.sender_address.toLowerCase();
    message.ip=info.ip;
    message.accessToken= sub_token.access_token;
    message.auth_dur=info.msg.auth_dur;

    let data = JSON.stringify(message);
    console.log(`access grant message:${data}`);

    let recover_address ="";

    //Recovers the account that signed the data.
    await web3.eth.personal.ecRecover(data, info.msg.signed_message)
        .then((address)=>{
            console.log(`recover_address:${address}`);
            recover_address = address;
            });

    if(recover_address === sender_address){
        console.log(`access of ${info.ip} is granted,recover address is ${recover_address},sender address is ${sender_address}`);
        return true;
    }else {
        console.log(`access of ${info.ip} is denied, recover address is ${recover_address},sender address is ${sender_address} `);
        return false;
    }
};

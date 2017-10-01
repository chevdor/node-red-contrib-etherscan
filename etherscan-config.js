module.exports = function(RED) {
    function RemoteServerNode(config) {
        RED.nodes.createNode(this, config);
        this.apikey = config.apikey;
        this.network = config.network;
        if (this.network !== 'homestead')
            this.api = require('etherscan-api').init(this.apikey, this.network);
        else
            this.api = require('etherscan-api').init(this.apikey);
    }
    RED.nodes.registerType("etherscan-config", RemoteServerNode, {
        credentials: {
            apikey: { type: "password" }
        }
    });
}
module.exports = function(RED) {
    function RemoteServerNode(n) {
        RED.nodes.createNode(this,n);
        this.apikey = n.apikey;
        this.network = n.network;
    }
    RED.nodes.registerType("etherscan-config",RemoteServerNode);
}
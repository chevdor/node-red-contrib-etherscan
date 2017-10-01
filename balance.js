var api = require('etherscan-api').init('YourApiKey');

module.exports = function(RED) {

    if (false) { // Test for nodes compatibilities
        throw "Info : not compatible";
    }

    function NodeConstructor(config) {
        RED.nodes.createNode(this, config);
        this.EtherscanConfig = RED.nodes.getNode(config.EtherscanConfig);

        var node = this;

        var balance = api.account.balance('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae');
        node.status({fill:"green",shape:"ring",text:"connected"});

        node.on('input', function(msg) {
            // node.send(msg);
            balance.then(function(balanceData){
                balanceData.payload = balanceData.result;
                // balanceData.apiKey= node.EtherscanConfig.apiKey;
                node.send(balanceData);
                node.status({fill:"green",shape:"dot",text:"done"});
            });
        });

        node.on("close", function() {
        });
    };
    
    RED.nodes.registerType("Balance", NodeConstructor);
}
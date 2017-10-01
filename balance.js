module.exports = function(RED) {

    if (false) { // Test for nodes compatibilities
        throw "Info : not compatible";
    }

    function NodeConstructor(config) {
        RED.nodes.createNode(this, config);
        this.etherscan = RED.nodes.getNode(config.apiconfig);

        var node = this;

        node.on('input', function(msg) {
            var address = msg.payload;

            if (node.etherscan) {
                node.status({ fill: "green", shape: "ring", text: "sending request..." });
                var balance = node.etherscan.api.account.balance(address);
                balance.then(function(balanceData) {
                    msg.payload = {
                        balanceData : balanceData,
                        address: address
                    };
                   
                    node.send(msg);
                    node.status({ fill: "green", shape: "dot", text: "done" });
                });
            } else {
                // not configured
                node.status({ fill: "red", shape: "dot", text: "missing config" });
            }
        });

        node.on("close", function() {
            node.status({ fill: "gray", shape: "dot", text: "closing" });
        });
    };

    RED.nodes.registerType("Balance", NodeConstructor);
}
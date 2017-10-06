module.exports = function(RED) {

    if (false) { // Test for nodes compatibilities
        throw "Info : not compatible";
    }

    function NodeConstructor(config) {
        RED.nodes.createNode(this, config);
        this.etherscan = RED.nodes.getNode(config.apiconfig);
        var node = this;

        node.on('input', function(msg) {
            // node.send(msg);
            var call = null;
            if (node.etherscan) {
                // console.log(node.etherscan.api);
                call = eval('node.etherscan.api.' + config.endpoint + '.' + config.method)();

                call.then(function(data) {
                    msg.payload = {
                        endpoint: config.endpoint,
                        method: config.method,
                        data: data
                    };

                    node.send(msg);
                });
            }
        });
        node.on("close", function() {});
    };

    RED.nodes.registerType("Etherscan", NodeConstructor);
}
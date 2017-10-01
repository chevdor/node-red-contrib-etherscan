module.exports = function(RED) {

    if (false) { // Test for nodes compatibilities
        throw "Info : not compatible";
    }

    function NodeConstructor(config) {
        RED.nodes.createNode(this, config);
        this.etherscan = RED.nodes.getNode(config.apiconfig);
        var node = this;

        node.on('input', function(msg) {
            var call = null;
            if (node.etherscan) {
                node.status({ fill: "green", shape: "ring", text: "sending request..." });

                switch (config.method) {
                    case "ethsupply":
                        call = node.etherscan.api.stats.ethsupply();
                        break;
                    case "ethprice":
                        call = node.etherscan.api.stats.ethprice();
                        break;
                    default:
                        node.status({ fill: "red", shape: "dot", text: "Unknown method: " + config.method });
                        break;
                }

                call.then(function(data) {
                    msg.payload = {
                        method: config.method,
                        data: data
                    };

                    node.send(msg);
                    node.status({ fill: "green", shape: "dot", text: "done" });

                });
            } else {
                node.status({ fill: "red", shape: "dot", text: "missing config" });

            }
        });

        node.on("close", function() {});
    };

    RED.nodes.registerType("Stats", NodeConstructor);
}
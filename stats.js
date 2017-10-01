module.exports = function(RED) {

    if (false) { // Test for nodes compatibilities
        throw "Info : not compatible";
    }

    function NodeConstructor(config) {
        RED.nodes.createNode(this, config);
        this.EtherscanConfig = RED.nodes.getNode(config.EtherscanConfig);
        var node = this;

        node.on('input', function(msg) {
            msg.method = config.method;
            node.send(msg);
        });

        node.on("close", function() {});
    };

    RED.nodes.registerType("Stats", NodeConstructor);
}
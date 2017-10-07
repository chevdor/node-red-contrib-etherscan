module.exports = function(RED) {

    if (false) { // Test for nodes compatibilities
        throw "Info : not compatible";
    }

    /**
     * Get input values 
     * @param  args Array of string with the names of inputs
     */
    function getInputs(args, msg) {
        var res = [];
        if (!args) return [];
        for (var i = 0; i < args.length; i++) {
            res[args[i]] = msg.payload[args[i]];
        }
        return res;
    }

    function NodeConstructor(config) {
        RED.nodes.createNode(this, config);
        this.etherscan = RED.nodes.getNode(config.apiconfig);
        var node = this;

        node.on('input', function(msg) {
            // node.send(msg);
            var call = null;
            if (node.etherscan) {
                var args = getInputs(config.args, msg);
                console.log('config.args', config.args);
                console.log('args', args);
                call = eval('node.etherscan.api.' + config.endpoint + '.' + config.method)(...args);

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
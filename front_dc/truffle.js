require('babel-register');
require('babel-polyfill');

module.exports = {
    networks: {

        kovan: {
            host: "localhost",
            port: 8545,
            network_id: 42,
            gas: 4700000,
            gasPrice: 10000000000,
            from: "0x7ae9b2b6348c9ef23eb7ebe7db5c125776e7df97"

        },

        ropsten: {
            host: "localhost",
            port: 8545,
            network_id: 3,
            gas: 4700000
        },
        
        ganache: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        },
    },

    mocha: {
        reporter: 'eth-gas-reporter',
        reporterOptions: {
            currency: 'USD',
            gasPrice: 21
        }
    }

};
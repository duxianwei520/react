const path = require('path');

module.exports = {
    resolve: {
        alias: {
            components: path.join(__dirname, '/app/components'),
            actions: path.join(__dirname, '/app/actions'),
            api: path.join(__dirname, '/app/api'),
            reducers: path.join(__dirname, '/app/reducers'),
            utils: path.join(__dirname, '/app/utils'),
            constants: path.join(__dirname, '/app/constants'),
        },
    },
};

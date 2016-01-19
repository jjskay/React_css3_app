import config from './'
var serverConfig = {
    mongo: {
        session: {
            url: 'mongodb://localhost/mongosession',
            ttl: 60 * config.userProfileExpire//20 min
        },
        quattro: {
            url: 'mongodb://localhost/quattrometadata',
        },
        userActivity: {
            url: 'mongodb://localhost/diquattroactivity',
            schemaVersion: 2
        }
    },
    server: {
        addr: '',
        port: 3010,

        isSecureSite: false,

        // user activity logger
        logUserActivity: true,

        //enable logger middleware ,it should set to false on production env
        enableLog: true
    }

};
module.exports = serverConfig;
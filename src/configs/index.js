var  hostConfig = require('./host.json');

var config = {
    userProfileExpire:40,
    apiService:'http://localhost/DIWAPI_Texas/api/',
    program:'Texas Student Assessments',

    links:{
        tea: "http://emetric.net",
        poweredby: "http://emetric.net"
    }
};
 
config.path_prefix = (hostConfig.instance_name? '/':'')+hostConfig.instance_name;

module.exports = config;
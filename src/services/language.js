import configs from '../configs';
import request from 'superagent';
import fs from 'fs';
import LanguageHelper from '../utils/language';

var language = {
    name: 'language',
    read: function (req, resource, params, config, callback) {
        let helper = new LanguageHelper({req: req});
        let langName = params.lang || helper.getLang();
        let langPath = '../locales/' + langName + '.json';
        let langSource = require(langPath);
        callback(null, langSource)
    }
};

export default language
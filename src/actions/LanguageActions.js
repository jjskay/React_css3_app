import API from '../utils/apiUtils.js'
import store from '../utils/sessionStorage';
import fetchClientConfig from '../utils/fetchClientConfig'

var endpoint = 'language';
var api = API[endpoint];
var LanguageActions = {};

LanguageActions.LoadLanguage = function (context, payload, done) {
    var params = {
        lang: context.language.getLang()
    };
    var callback = (err, res, save)=> {
        context.dispatch(api.action, {
            data: res,
            save: save
        });
        done();
    };
    store.retrieve(endpoint, params, callback, function (savecallback, saveOpts) {
        context.service.read(api.url, params, fetchClientConfig, function (err, res) {
            savecallback(res)
            callback(err, res, saveOpts)
        });
    })
};

LanguageActions.ChangeLanguage = function (context, payload, done) {
    var params = {
        lang: payload.lang || context.language.getLang()
    };
    var callback = (err, res, save)=> {
        context.dispatch('CHANGE_LANGUAGE', {
            data: res,
            save: save
        });
        done();
    };
    store.retrieve(endpoint, params, callback, function (savecallback, saveOpts) {
        context.service.read(api.url, params, fetchClientConfig, function (err, res) {
            savecallback(res)
            callback(err, res, saveOpts)
        });
    })
};

module.exports = LanguageActions;
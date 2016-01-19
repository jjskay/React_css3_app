import API from '../utils/apiUtils.js'
import store from '../utils/sessionStorage';
import fetchClientConfig from '../utils/fetchClientConfig'

var endpoint = 'applicationpreference';
var api = API[endpoint];

var ApplicationPreferenceActions = {
    LoadApplicationPreference: (context, payload, done)=> {
        var callback = (err, res, save)=> {
            context.dispatch(api.action, {
                data: res,
                save: save
            });
            done();
        };
        store.retrieve(endpoint, payload, callback, function (savecallback, saveOpts) {
            context.service.read(api.url, payload, fetchClientConfig, function (err, res) {
                savecallback(res)
                callback(err, res, saveOpts)
            });
        })
    }
};

export default ApplicationPreferenceActions;
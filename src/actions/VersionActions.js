import API from '../utils/apiUtils.js';
import store from '../utils/sessionStorage';
import fetchClientConfig from '../utils/fetchClientConfig';
import dataValidator from '../utils/dataValidator';
import {ErrorActions} from './';

var VersionActions = {};
var endpoint = 'versions';
var api = API[endpoint];

VersionActions.LoadVersions = function (context, payload, done) {
    var callback = (err, res, save)=> {
        if (err) {
            context.executeAction(ErrorActions.ErrorOccurred, {error: err}, done);
        }
        else {
            var validateResult = dataValidator.doValidate(endpoint, res);
            if (validateResult) {
                context.executeAction(ErrorActions.ErrorOccurred, {error: validateResult}, done);
                return;
            }
            else{
                context.dispatch(api.action, {
                    data: res,
                    save: save
                });
            }

            done();
        }
    };
    store.retrieve(endpoint, payload, callback, function (savecallback, saveOpts) {
        context.service.read(api.url, payload, fetchClientConfig, function (err, res) {
            savecallback(res);
            callback(err, res, saveOpts);
        });
    });
};

export default VersionActions;

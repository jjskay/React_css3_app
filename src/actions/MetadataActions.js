import API from '../utils/apiUtils.js';
import store from '../utils/sessionStorage';
import fetchClientConfig from '../utils/fetchClientConfig';
import dataValidator from '../utils/dataValidator';
import {ErrorActions} from './';

var MetadataActions = {

    LoadAll: (context, payload, done)=> {
        var callback = (err, res, save)=> {
            if (err) {
                context.executeAction(ErrorActions.ErrorOccurred, {error: err}, done);
                return;
            }
            if (res.ok !== 1) {
                context.executeAction(ErrorActions.ErrorOccurred, {error: 'getMainSelectorsMetadata() returns invaild data'}, done);
            }
            else {
                context.dispatch('LOAD_DOMAIN_METADATA_SUCCESS', {
                    data: res,
                    save: save
                });
                done();
            }
        };
        context.dispatch('LOAD_DOMAIN_METADATA');
        store.retrieve('domainmetadata', payload, callback, (savecallback, saveOpts)=> {
            context.service.read('mainSelectorsMetadata', payload, fetchClientConfig, (err, res)=> {
                savecallback(res);
                callback(err, res, saveOpts);
            });
        });
    },
    ChangeDomain: (context, payload, done)=> {
        var callback = (err, res, save)=> {
            if (err) {
                context.executeAction(ErrorActions.ErrorOccurred, {error: err}, done);
                return;
            }
            if (res.ok !== 1) {
                context.executeAction(ErrorActions.ErrorOccurred, {error: 'getMainSelectorsMetadata() returns invaild data'}, done);
            }
            else {
                res.domainValue = payload.domainValue;
                context.dispatch('CHANGE_DOMAIN_SUCCESS', {
                    data: res,
                    save: save
                });
                done();
            }
        };
        context.dispatch('CHANGE_DOMAIN');
        store.retrieve('domainmetadata', payload, callback, (savecallback, saveOpts)=> {
            context.service.read('mainSelectorsMetadata', payload, fetchClientConfig, (err, res)=> {
                savecallback(res);
                callback(err, res, saveOpts);
            });
        });
    },
    ChangeReport: (context, payload, done)=> {
        var callback = (err, res, save)=> {
            if (err) {
                context.executeAction(ErrorActions.ErrorOccurred, {error: err}, done);
                return;
            }
            if (res.ok !== 1) {
                context.executeAction(ErrorActions.ErrorOccurred, {error: 'getMainSelectorsMetadataForReport() returns invaild data'}, done);
            }
            else {
                res.reportValue = payload.reportValue;
                context.dispatch('CHANGE_REPORT_SUCCESS', {
                    data: res,
                    save: save
                });
            }
            done();
        };
        context.dispatch('CHANGE_REPORT');
        store.retrieve('reportmetadata', payload, callback, (savecallback, saveOpts)=> {
            context.service.read('mainSelectorsMetadataForReport', payload, fetchClientConfig, (err, res)=> {
                savecallback(res);
                callback(err, res, saveOpts);
            });
        });
    }
};



export default MetadataActions;


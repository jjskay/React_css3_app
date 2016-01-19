import _ from 'lodash';
var API = {
    /***************************************
     * url:webapi request url
     * action:fluxible actionName [Optional]
     * params:{
     *      name:[Optional]
     * }
     * params:webapi request params,name:param Name,Optional:true or false
     * save:{
     *      expired:[Number]
     *      savekey:[Optional]
     * }
     * save:sessionStore save Options,expired:expired minute ,0 never expired,savekey: optional,a save key
     *************************************/
    applicationpreference: {
        url: 'clientapi.applicationPreference',
        action: 'LOAD_APPLICATIONPREFERENCE',
        save: {
            expired: 30
        }
    },

    domainmetadata: {
        url: 'mainselectorsmetadata',
        params: {
            domainsVersion: true,
            reportsVersion: true,
            scopesVersion: true,
            orgtypesVersion: true,
            domainValue: false,
        },
        save: {
            expired: 30
        }
    },

    reportmetadata: {
        url: 'mainselectorsmetadata',
        params: {
            domainsVersion: true,
            reportsVersion: true,
            scopesVersion: true,
            domainValue: true,
            reportValue: true
        },
        save: {
            expired: 30
        }
    },

    versions: {
        url: 'versions',
        action: 'LOAD_VERSIONS',
        save: {
            expired: 30
        }
    },
    language: {
        url: 'language',
        action: 'LOAD_LANGUAGE',
        params: {
            lang: true
        },
        save: {
            expired: 60 * 24
        }
    }
};

export function exsitApi(name) {
    return API[name.toLowerCase()] !== null;
}

export function shrinkQuery(name, query) {
    var params, shrink = {}, opts = Object.assign({}, query);
    if (opts && name) {
        params = API[name.toLowerCase()].params;

        if (params) {
            Object.keys(params).forEach((key)=> {
                if (opts[key]) {
                    shrink[key] = opts[key];
                }
            });
        }
        else {
            shrink = _.clone(opts);
        }
    }

    return shrink;
}
export default API;

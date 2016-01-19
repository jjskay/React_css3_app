import Fluxible from 'fluxible';
import fetchrPlugin from 'fluxible-plugin-fetchr';
import config from  './configs';
import sessionStorage from './utils/sessionStorage';
import {LanguageStore, VersionStore, ErrorStore, MetadataStore, ReportMetadataStore, ScopeMetadataStore} from './stores';

// init namespace for current App
sessionStorage.setNamespace('di_quattro');

let app = new Fluxible({
    component: require('./routes')
});

app.plug(fetchrPlugin({
    xhrPath: config.path_prefix + '/api',
    xhrTimeout: 30000,
}));

app.plug(require('./plugins/cookie'));
app.plug(require('./plugins/language'));
app.plug(require('./plugins/config'));

app.registerStore(ErrorStore);
app.registerStore(LanguageStore);
// app.registerStore(DomainStore);
app.registerStore(VersionStore);
// app.registerStore(ReportMetaStore);
app.registerStore(MetadataStore);

export default  app;

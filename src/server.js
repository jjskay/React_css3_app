import './polyfills';
import express from 'express';
import session from 'express-session';
import useragent from 'express-useragent';
import connectMongo from 'connect-mongo';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import activityLogger from './utils/activityLogger';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import serialize from 'serialize-javascript';
import mongoose from 'mongoose';
import cors from 'cors'
import React from 'react';
import { renderToString,renderToStaticMarkup }from 'react-dom/server';
import { match,RoutingContext,Router} from 'react-router';
import createRoutes from './routes'
import fetchData from './utils/fetchData';
import app from './app';
import CustomFluxibleComponent from './components/CustomFluxibleComponent';
import {AuthActions} from './actions';
// import {clientApi, language, domains, reportMeta, versions} from './services';
import {versions, language, mainSelectorsMetadata, mainSelectorsMetadataForReport} from './services';

import Html from './components/Html';
import config from './configs';
import assets from './utils/assets';
import Language from './utils/language';
import serverConfig from './configs/server';


var server = express();
var MongoStore = connectMongo(session);

mongoose.connect(serverConfig.mongo.quattro.url);

var customContextTypes = {
    config: React.PropTypes.object,
};

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');
if (serverConfig.server.enableLog) {
    server.use(logger('dev'));
}
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());
server.use(favicon(__dirname + '/public/images/favicon.ico'));
server.use(cors());
server.use(config.path_prefix + '/health', function (req, res) {
    res.send('I am ok');
});
server.use(config.path_prefix + '/static', express.static(path.join(__dirname, 'public')));
server.use(config.path_prefix + '/static', (req, res, next) => {
    res.render('error', {status: 404, stack: 'no such file'})
});
server.use(session(
    {
        secret: 'secret',
        store: new MongoStore(serverConfig.mongo.session),
        resave: false,
        saveUninitialized: false
    }
));

var fetchrPlugin = app.getPlugin('FetchrPlugin');

// fetchrPlugin.registerService(clientApi);
fetchrPlugin.registerService(language);
// fetchrPlugin.registerService(domains);
// fetchrPlugin.registerService(reportMeta);
fetchrPlugin.registerService(mainSelectorsMetadata);
fetchrPlugin.registerService(mainSelectorsMetadataForReport);
fetchrPlugin.registerService(versions);

server.use(useragent.express());
server.use(activityLogger);

server.use(fetchrPlugin.getXhrPath(), fetchrPlugin.getMiddleware());

server.use((req, res, next) => {
    let context = app.createContext({
        req: req,
        res: res,
        config: config
    });
    let routes = createRoutes(context);
    match({routes, location: req.url}, (error, redirectLocation, routerState) => {
        if (error) {

            res.render('error', {status: 500, stack: error.message})
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (routerState) {
            fetchData(context, routerState, (err) => {
                if (err) {
                    console.log(err)
                    res.render('error', {status: 500, stack: err.message})
                } else {
                    var exposed = 'window.__DATA__=' + serialize(app.dehydrate(context));
                    var doctype = '<!DOCTYPE html>';
                    var markup = renderToString(React.createElement(
                        CustomFluxibleComponent,
                        {context: context.getComponentContext()},
                        <RoutingContext {...routerState} />
                    ));
                    var html = renderToStaticMarkup(<Html assets={assets} markup={markup} exposed={exposed}/>);
                    res.send(doctype + html);
                }
            })
        } else {
            res.render('error', {status: 404, stack: error.message})
        }
    });
});
module.exports = server;
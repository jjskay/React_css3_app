import React from 'react'
import { Route,Redirect,IndexRoute,Router} from 'react-router'
import config from './configs'
import { App,List,NotFound } from './components';

let path = config.path_prefix === '' ? '/' : config.path_prefix;

var createRoutes = (context)=> {
    return (
        <Route component={App} path={path}>
            <IndexRoute component={List}/>
            <Route path="list" component={List}/>
            <Route path="*" component={NotFound}/>
        </Route>
    );
}

module.exports = createRoutes;
import React from 'react';
import { History, Link } from  'react-router';
import { concurrent } from 'contra';
import { FullScreen,MessageBox} from './UI';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import PerformanceMixin from '../mixins/PerformanceMixin'
import ReactIntl,{IntlMixin,FormattedMessage} from  'react-intl'
import {LanguageStore,ErrorStore} from '../stores';
import {LanguageActions,ErrorActions} from '../actions';
import MediaMixin from '../mixins/MediaMixin';

var App = React.createClass({

    displayName: 'App',

    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },

    mixins: [IntlMixin, FluxibleMixin, PerformanceMixin, MediaMixin],

    statics: {
        storeListeners: [LanguageStore, ErrorStore],
        fetchData: function (context, params, query, done) {
            concurrent([
                context.executeAction.bind(context, LanguageActions.LoadLanguage, {})
            ], done);
        }
    },

    getInitialState: function () {
        let state = this.getStateFromStores();
        return Object.assign({}, state, {
            media: this.props.media
        });
    },
    getStateFromStores: function () {
        return {
            language: this.getStore(LanguageStore).getLanguage(),
            errorMessage: this.getStore(ErrorStore).getError()
        }
    },

    onChange: function () {
        this.setState(this.getStateFromStores());
    },

    onErrorClose(){
        this.getStore(ErrorStore).clearError()
        this.setState({
            errorMessage: null
        })
    },
    changeLanguage: function (lang) {
        this.executeAction(LanguageActions.ChangeLanguage, {
            lang: lang
        })
    },
    render() {
        var langSource = this.state.language;
        var showError = this.state.errorMessage != null;
        var appInitData = Object.assign({}, langSource, {
            changeLanguage: this.changeLanguage
        }, {media: this.state.media, initialMedia: this.state.initialMedia, key: new Date().getTime()});
        var child = React.cloneElement(this.props.children, appInitData);
        // var errorMessage=this.state.error&&this.state.error.message;

        return (
            <FullScreen id="app">
                {child}
                <MessageBox status='error' onClose={this.onErrorClose} close={true} message={this.state.errorMessage}
                            showImmediately={showError}/>
            </FullScreen>
        )
    }
})
export default App;
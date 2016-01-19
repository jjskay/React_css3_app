'use strict';
import  React from 'react';

var CustomFluxibleComponent = React.createClass({
    displayName: 'CustomFluxibleComponent',

    propTypes: {
        context: React.PropTypes.object.isRequired
    },

    childContextTypes: {
        executeAction: React.PropTypes.func.isRequired,
        getStore: React.PropTypes.func.isRequired,
        config: React.PropTypes.object,
    },

    /**
     * Provides the current context as a child context
     * @method getChildContext
     */
    getChildContext: function () {
        return {
            getStore: this.props.context.getStore,
            executeAction: this.props.context.executeAction,
            config: this.props.context.config,
        };
    },

    render: function () {
        return React.cloneElement(this.props.children, {
            context: this.props.context
        });
    }
});
export default CustomFluxibleComponent

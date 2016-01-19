import React from 'react';
import config from '../configs';
import urlContent from '../mixins/urlContent'

var Html = React.createClass({

    mixins:[urlContent],

    render: function () {
        return (
            <html>
            <head>
                <meta charSet="utf-8"/>
                <title>{this.props.title}</title>
                <meta name="viewport" content="width=device-width,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, initial-scale=1"/>
                <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,400italic,600,700" rel="stylesheet" type="text/css"/>
                <link href={this.urlContent('styles/main.css')} rel="stylesheet" type="text/css"/>
                <script dangerouslySetInnerHTML={{__html: this.props.tracking}}></script>

            </head>
            <body>
            <div id="main" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
            <script dangerouslySetInnerHTML={{__html: this.props.exposed}}></script>
            <script src={this.props.assets.common}></script>
            <script src={this.props.assets.main}></script>
            {this.props.assets.essentials && (<script src={this.props.assets.essentials}></script>)}
            </body>
            </html>
        );
    }
})
export default Html;
import React from 'react';
import Events from '../utils/events';
import {MediaSize,Media} from '../utils/mediaSize'


module.exports = {

    getDefaultProps(){
        return {
            adjustSize: false,
            deviceSize: MediaSize.LARGE,
            media: Media.LARGE
        };
    },

    componentDidMount() {
        this.intialSetMeida = true;
        this._updateDeviceSize();
        if (!this.manuallyBindResize) this._bindResize();
    },

    componentWillUnmount () {
        this._unbindResize();
    },

    _updateDeviceSize() {
        let width = window.innerWidth;
        let mediaOptions = {};
        if (width >= MediaSize.LARGE) {
            mediaOptions = {
                deviceSize: MediaSize.LARGE,
                adjustSize: true,
                media: Media.LARGE
            }
        }
        else if (width >= MediaSize.MEDIUM) {
            mediaOptions = {
                deviceSize: MediaSize.MEDIUM,
                adjustSize: true,
                media: Media.MEDIUM
            }
        }
        else {
            mediaOptions = {
                deviceSize: MediaSize.SMALL,
                adjustSize: true,
                media: Media.SMALL
            };
        }
        if (this.intialSetMeida) {
            mediaOptions = Object.assign({}, mediaOptions, {initialMedia: mediaOptions.media});
        }
        console.log(mediaOptions);
        this.setState(mediaOptions);
        this.intialSetMeida = false;
    },

    _bindResize() {
        Events.on(window, 'resize', this._updateDeviceSize);
    },

    _unbindResize() {
        Events.off(window, 'resize', this._updateDeviceSize);
    }
};
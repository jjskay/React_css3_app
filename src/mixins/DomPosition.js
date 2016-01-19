import React from 'react';
import MediaSize from '../utils/mediaSize'


module.exports = {
    isMediaSmall(){
        var width = window.innerWidth;
        return width <= MediaSize.SMALL;
    },
    getVerticallyCenterTop(el, elHeight){
        var height = window.innerHeight;
        var currentHeight = elHeight || el.offsetHeight;
        return (height - currentHeight) / 2;
    }
};
import React, { memo } from 'react';
import ReactDOM from "react-dom";
import { shallowEqual, useSelector } from 'react-redux';

import {
    CaptionWrapper
} from './style'


const ZAppCaption = function (props) {
    const { lyricList, lyricIndex } = useSelector(state => ({
        lyricList: state.getIn(['player', 'lyricList']),
        lyricIndex: state.getIn(['player', 'lyricListIndex'])
    }), shallowEqual)

    const lyric = lyricList[lyricIndex] && lyricList[lyricIndex].context

    return ReactDOM.createPortal( lyric ? (<CaptionWrapper>
        { lyric }
    </CaptionWrapper>) : null

        , document.getElementById('lyric'))
}

export default memo(ZAppCaption)
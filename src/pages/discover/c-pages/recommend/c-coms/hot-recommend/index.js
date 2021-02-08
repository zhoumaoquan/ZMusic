import React, { memo, useEffect } from 'react';

import ZHeaderRecommend from '@/components/header-rem'
import ZSongsCover from '@/components/song-cover'

import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { getHotRecommend } from '../../store/actionTypes'

import {
    HotRecommendWrapper
} from './style'

const ZHotRecommend = memo(function (props) {
    
    const { hotList } = useSelector(state => ({
        hotList: state.getIn(['recommend', 'hotList'])
    }), shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHotRecommend(8))
    }, [dispatch])

    return (
        <HotRecommendWrapper>
            <ZHeaderRecommend title='热门推荐' keywords={['华语', '流行', '摇滚', '民谣', '电子']} />
            <div className="recommend-list">
                {
                    hotList.map((item, index) => {
                        return <ZSongsCover info={item} key={item.id} />
                    })
                }
            </div>
        </HotRecommendWrapper>
    )
})

export default ZHotRecommend
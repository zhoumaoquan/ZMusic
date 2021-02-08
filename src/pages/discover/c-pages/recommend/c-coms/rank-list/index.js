import React, { memo, useEffect } from 'react'

import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import ZHeaderRecommend from '@/components/header-rem';
import RankItem from '@/components/rank-item';


import { getRankList } from '../../store/actionTypes'

import {  
    RankingWrapper
} from './style'


const RankList = memo(function (props) {

    const { soarRank, newRank, originalRank } = useSelector(state => ({
        soarRank: state.getIn(['recommend', 'soarRank']),
        newRank: state.getIn(['recommend', 'newRank']),
        originalRank: state.getIn(['recommend', 'originalRank'])
    }), shallowEqual)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRankList(0))
        dispatch(getRankList(2))
        dispatch(getRankList(3))
    }, [dispatch])

    return (
        <RankingWrapper>
            <ZHeaderRecommend title="榜单" />
            <div className="tops">
                <RankItem info={soarRank} />
                <RankItem info={newRank} />
                <RankItem info={originalRank} />
            </div>
        </RankingWrapper>
    )
})

export default RankList
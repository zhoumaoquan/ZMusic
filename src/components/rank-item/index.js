import React, { memo } from 'react';

import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types'

import { setImageSize } from '@/utils/format'

import { getSingerAction, addPlayerListAction } from "@/pages/player/store";

import { TopRankingWrapper } from './style'


const RankItem = memo(function (props) {

    const { info } = props

    const { tracks = [] } = info

    const dispatch = useDispatch()

    const playMusic = (id) => {
        dispatch(getSingerAction(id))
    }

    const addPlayerList = (id) => {
        dispatch(addPlayerListAction(id))
    }

    return (
        <TopRankingWrapper>
            <div className="header">
                <div className="image">
                    <img src={setImageSize(info.coverImgUrl)} alt="" />
                    <a href="/todo" className="image_cover">ranking</a>
                </div>
                <div className="info">
                    <a href="/todo">{info.name}</a>
                    <div>
                        <button className="btn play sprite_02"></button>
                        <button className="btn favor sprite_02"></button>
                    </div>
                </div>
            </div>
            <div className="list">
                {
                    tracks.slice(0, 10).map((item, index) => {
                        return (
                            <div key={item.id} className="list-item">
                                <div className="rank">{index + 1}</div>
                                <div className="info">
                                    <span className="name text-nowrap">{item.name}</span>
                                    <div className="operate">
                                        <button className="btn sprite_02 play" onClick={e => playMusic(item.id)}></button>
                                        <button className="btn sprite_icon2 addto" onClick={e => addPlayerList(item.id)}></button>
                                        <button className="btn sprite_02 favor"></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="footer">
                <a href="/todo">查看全部 &gt;</a>
            </div>
        </TopRankingWrapper>
    )
})

RankItem.propTypes = {
    info: PropTypes.object.isRequired
}

RankItem.defaultProps = {
    info: {}
}

export default RankItem
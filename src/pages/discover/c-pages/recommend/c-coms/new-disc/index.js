import React, { memo, useEffect, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import ZHeaderRecommend from '@/components/header-rem';
import AlbumCover from '@/components/album-cover';
import { Carousel } from 'antd'

import { AlbumWrapper } from './style'

import { getNewDisc } from '../../store/actionTypes'


const ZNewDisc = function (props) {
    const { discList } = useSelector(state => ({
        discList: state.getIn(['recommend', 'discList'])
    }), shallowEqual)
    const dispatch = useDispatch()

    const swiperRef = useRef()

    useEffect(() => {
        dispatch(getNewDisc())
    }, [dispatch])

    return (
        <AlbumWrapper>
            <ZHeaderRecommend title='新碟上架' />
            <div className="content">
                <button className="arrow arrow-left sprite_02"
                    onClick={e => swiperRef.current.prev()}
                ></button>
                <div className="album">
                    <Carousel dots={false} ref={swiperRef}>
                        {
                            [0, 1].map((item, index) => {
                                return (
                                    <div className="page" key={item}>
                                        {
                                            discList.slice(item * 5, (item + 1) * 5).map((itez, indez) => {
                                                return <AlbumCover key={itez.id}
                                                    info={itez}
                                                    size={100}
                                                    width={118}
                                                    bgp="-570px"
                                                />
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
                <button className="arrow arrow-right sprite_02"
                    onClick={e => swiperRef.current.next()}
                ></button>
            </div>
        </AlbumWrapper>
    )
}


export default memo(ZNewDisc)
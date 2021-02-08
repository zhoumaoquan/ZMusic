import React, { memo, useEffect, useRef, useState, useCallback } from 'react';

import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { getRecommendBanners } from '../../store/actionTypes'

import { Carousel } from 'antd';

import {
    BannerWrapper,
    BannerLeft,
    BannerRight,
    BannerControl
} from './style'


function ZTopBanners(props) {
    // 创建 轮播图实例引用
    const bannerRef = useRef()

    // 当前 轮播索引 状态
    const [current, setCurrent] = useState(0)

    // redux 中获取轮播数据
    const { topBanners } = useSelector(state => ({
        topBanners: state.getIn(['recommend', 'banners'])
    }), shallowEqual)

    const dispatch = useDispatch()

    // 派发 action 请求接口
    useEffect(() => {
        dispatch(getRecommendBanners())
    }, [dispatch])

    // 轮播 循环渲染函数
    const swiperRender = function () {
        return topBanners.map((item, index) => {
            return (
                <div className="banner-item" key={item.targetId}>
                    <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                </div>
            )
        })
    }

    // 轮播改变 更新当前索引
    const swiperChange = useCallback(function (from, to) {
        setTimeout(() => {
            setCurrent(to)
        }, 0)
    }, [])

    // 当前轮播 背景 '?imageView&blur=40x20'即添加高斯模糊效果
    const bgImage = topBanners[current] && (topBanners[current].imageUrl + '?imageView&blur=40x20')

    return (
        <BannerWrapper bgImage={bgImage}>
            <div className="banner wrap-v2">
                <BannerLeft>
                    <Carousel ref={bannerRef} effect="fade" autoplay beforeChange={swiperChange}>
                        {
                            swiperRender()
                        }
                    </Carousel>
                </BannerLeft>
                <BannerRight></BannerRight>
                <BannerControl>
                    <button className="btn left" onClick={e => bannerRef.current.prev()}></button>
                    <button className="btn right" onClick={e => bannerRef.current.next()}></button>
                </BannerControl>
            </div>
        </BannerWrapper>
    )
}

export default memo(ZTopBanners)
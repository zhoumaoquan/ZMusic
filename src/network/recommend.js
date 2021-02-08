import request from './index'

// 获取推荐 轮播图数据
export function recommendBanner() {
    return request({
        url: '/banner'
    })
}

// 获取 热门推荐数据
export function recommendHot(limit) {
    return request({
        url: '/personalized',
        params: {
            limit: limit || 8
        }
    })
}

// 获取新碟上架数据
export function recommendNewdics(limit) {
    return request({
        url: '/top/album',
        params: {
            limit
        }
    })
}

// 获取榜单数据
export function recommendRank(idx) {
    return request({
        url: '/top/list',
        params: {
            idx
        }
    })
}
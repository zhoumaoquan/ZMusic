import {
    recommendBanner,
    recommendHot,
    recommendNewdics,
    recommendRank
} from '@/network/recommend'

import { 
    CHANGE_TOP_BANNER,
    CHANGE_HOT_LIST,
    CHANGE_NEW_DICS,
    CHANGE_SOAR_RANK,
    CHANGE_NEW_RANK,
    CHANGE_ORIGINA_RANK
} from './content'

const bannerAction = (res) => ({
    type: CHANGE_TOP_BANNER,
    banners: res 
})

const hotAction = (res) => ({
    type: CHANGE_HOT_LIST,
    hotList: res
})

const newdiscAction = (res) => ({
    type: CHANGE_NEW_DICS,
    newAlbum: res
})

const soarRankAction = (res) => ({
    type: CHANGE_SOAR_RANK,
    soarRank: res
})

const newRankAction = (res) => ({
    type: CHANGE_NEW_RANK,
    newRank: res
})

const originalRankAction = (res) => ({
    type: CHANGE_ORIGINA_RANK,
    originaRank: res
})

export const getRecommendBanners = () => {
    return (dispatch) => {
        recommendBanner().then(res => {
            dispatch(bannerAction(res.banners))
        })
    }
}

export const getHotRecommend = () => {
    return (dispatch) => {
        recommendHot().then(res => {
            dispatch(hotAction(res.result))
        })
    }
}

export const getNewDisc = () => {
    return (dispatch) => {
        recommendNewdics(10).then(res => {
            dispatch(newdiscAction(res.albums))
        })
    }
}

export const getRankList = (idx) => {
    return (dispatch) => {
        recommendRank(idx).then(res => {
            switch(idx) {
                case 0:
                    dispatch(soarRankAction(res.playlist))
                    break;
                case 2:
                    dispatch(newRankAction(res.playlist))
                    break;
                case 3:
                    dispatch(originalRankAction(res.playlist))
                    break;
                default:
            }
        })
    }
}
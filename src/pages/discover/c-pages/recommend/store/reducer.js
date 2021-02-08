import { Map } from 'immutable'

import { 
    CHANGE_TOP_BANNER,
    CHANGE_HOT_LIST,
    CHANGE_NEW_DICS,
    CHANGE_SOAR_RANK,
    CHANGE_NEW_RANK,
    CHANGE_ORIGINA_RANK
} from './content'

const defaultState = Map({
    banners: [],
    hotList: [],
    discList: [],
    soarRank: {},
    newRank: {},
    originalRank: {}
})

function reducer(state = defaultState, action) {
    switch(action.type) {
        case CHANGE_TOP_BANNER:
            return state.set('banners', action.banners)
        case CHANGE_HOT_LIST:
            return state.set('hotList', action.hotList)
        case CHANGE_NEW_DICS:
            return state.set('discList', action.newAlbum)
        case CHANGE_SOAR_RANK:
            return state.set('soarRank', action.soarRank)
        case CHANGE_NEW_RANK:
            return state.set('newRank', action.newRank)
        case CHANGE_ORIGINA_RANK:
            return state.set('originalRank', action.originaRank)
        default: 
            return state
    }
}

export default reducer
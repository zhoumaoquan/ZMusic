import { Map } from 'immutable'

import { 
    CHANGE_CURRENT_SONG,
    CHANGE_PLAYER_LIST,
    CHANGE_CURRENT_INDEX,
    CHANGE_MUSIC_ORDER,
    CHANGE_LYRIC_LIST,
    CHANGE_LYRIC_LIST_INDEX
} from './context'

const defalutState = Map({
    playerList: [],
    singerDecs: {},
    playerIndex: 0,
    playerSequence: 0, // 列表播放顺序  0：循环播放  1：随机播放  2：单曲循环
    lyricList: [],
    lyricListIndex: 0
})

export default function reducer(state = defalutState, action) {
    switch(action.type) {
        case CHANGE_CURRENT_SONG:
            return state.set('singerDecs', action.songs)
        case CHANGE_PLAYER_LIST:
            return state.set('playerList', action.playerList)
        case CHANGE_CURRENT_INDEX:
            return state.set('playerIndex', action.index)
        case CHANGE_MUSIC_ORDER:
            return state.set('playerSequence', action.sequence)
        case CHANGE_LYRIC_LIST:
            return state.set('lyricList', action.lyricList)
        case CHANGE_LYRIC_LIST_INDEX:
            return state.set('lyricListIndex', action.index)
        default:
            return state
    }
}
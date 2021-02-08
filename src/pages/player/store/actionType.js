import { getSongDetail, getLyrics } from '@/network/player'

import {
    CHANGE_CURRENT_SONG,
    CHANGE_PLAYER_LIST,
    CHANGE_CURRENT_INDEX,
    CHANGE_MUSIC_ORDER,
    CHANGE_LYRIC_LIST,
    CHANGE_LYRIC_LIST_INDEX
} from './context'

import { getrandomNumber, handleLyric } from '@/utils/format'

// 当前歌曲信息
const currentSingerAction = (res) => ({
    type: CHANGE_CURRENT_SONG,
    songs: res
})

// 当前播放 列表索引
const playerIndexAction = (res) => ({
    type: CHANGE_CURRENT_INDEX,
    index: res
})

// 歌曲列表
const playerListAction = (res) => ({
    type: CHANGE_PLAYER_LIST,
    playerList: res
})

// 播放模式
const playerOrderAction = (sequence) => ({
    type: CHANGE_MUSIC_ORDER,
    sequence
})

// 当前播放音乐 歌词
const playerLyricListAction = (lyricList) => ({
    type: CHANGE_LYRIC_LIST,
    lyricList
})

export const playerLyricIndexAction = (index) => ({
    type: CHANGE_LYRIC_LIST_INDEX,
    index
})

const changeMusicAction = (index) => {
    return (dispatch, getState) => {
        const playerList = getState().getIn(['player', 'playerList'])
        
        const song = playerList[index]

        dispatch(playerIndexAction(index))

        dispatch(currentSingerAction(song))
        dispatch(getLyricsAction(song.id))
    }
}

// 当前更歌曲变更
export const getSingerAction = (ids) => {
    return (dispatch, getState) => {

        const playerList = getState().getIn(['player', 'playerList'])

        // 判断当前歌曲是否在列表中
        const index = playerList.findIndex(song => song.id === ids)

        if (index !== -1) {  // 歌曲在列表中
            const song = playerList[index]

            dispatch(playerIndexAction(index))

            dispatch(currentSingerAction(song))

            dispatch(getLyricsAction(ids))

        } else { // 歌曲不在列表中
            getSongDetail(ids).then(res => {
                const newPlayList = [...playerList]
                const song = res.songs && res.songs[0]
                if (!song) { return }
                newPlayList.push(song)
                dispatch(playerListAction(newPlayList))
                dispatch(playerIndexAction(newPlayList.length - 1))
                dispatch(currentSingerAction(song))

                dispatch(getLyricsAction(ids))
            })
        }
    }
}

// 改变 播放顺序
export const setPlayerSequence = () => {
    return (dispatch, getState) => {
        let sequence = getState().getIn(['player', 'playerSequence'])
        sequence += 1

        if (sequence > 2) {
            sequence = 0
        }

        dispatch(playerOrderAction(sequence))
    }
}

// 歌曲上下切换
export const musicSwitching = (tag) => {
    return (dispatch, getState) => {
        let sequence = getState().getIn(['player', 'playerSequence'])
        
        let currentIndex = getState().getIn(['player', 'playerIndex'])

        const playerList = getState().getIn(['player', 'playerList'])

        switch(sequence) {
            case 1:
                let randomIndex = getrandomNumber(playerList.length)
                while (randomIndex === currentIndex) {
                    randomIndex = getrandomNumber(playerList.length)
                }

                dispatch(changeMusicAction(randomIndex))
            break;
            default: 
                let newCurrentIndex = currentIndex += tag
                if(newCurrentIndex >= playerList.length) { newCurrentIndex = 0 }
                if(newCurrentIndex < 0) { newCurrentIndex = playerList.length - 1 }

                dispatch(changeMusicAction(newCurrentIndex)) 
            break;
        }
    }
}

export const addPlayerListAction = (ids) => {
    return (dispatch, getState) => {
        const playerList = getState().getIn(['player', 'playerList'])

        const index = playerList.findIndex(song => song.id === ids)
        console.log(index)
        if(index > 0) {
           return
        }

        getSongDetail(ids).then(res => {
            const newList = [...playerList]
            const song = res.songs && res.songs[0]
            if (!song) { return }
            newList.push(song)
            dispatch(playerListAction(newList))

        })
    }
}


// 歌词处理
export const getLyricsAction = (ids) => {
    return (dispatch) => {
        getLyrics(ids).then(res => {
            const lyricStr = res.lrc.lyric || ''
            const lyricList =  handleLyric(lyricStr)

            dispatch(playerLyricListAction(lyricList))
        })
    }
}
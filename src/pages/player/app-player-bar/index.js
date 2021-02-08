import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { Slider } from 'antd'

import ZAppCaption from './c-cpns/app-caption'

import { setImageSize, formatDate, getPlaySong } from '@/utils/format'
import debounce from '@/utils/debounce'

import {
    PlaybarWrapper,
    Control,
    PlayInfo,
    Operator
} from './style'

import { getSingerAction, setPlayerSequence, musicSwitching, playerLyricIndexAction } from '../store/actionType'


const ZAppPlayerBar = memo(function (props) {

    const [currentTime, setCurrentTime] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isChange, setIsChange] = useState(false)
    const [isPlaying, setPlaying] = useState(false)

    const { currentSong, sequence, length, lyricList, lyricIndex } = useSelector(state => ({
        currentSong: state.getIn(['player', 'singerDecs']),
        sequence: state.getIn(['player', 'playerSequence']),
        length: state.getIn(['player', 'playerList']).length,
        lyricList: state.getIn(['player', 'lyricList']),
        lyricIndex: state.getIn(['player', 'lyricListIndex'])
    }), shallowEqual)

    const dispatch = useDispatch()

    const audioRef = useRef()
    useEffect(() => {
        dispatch(getSingerAction(167876))
    }, [dispatch])

    useEffect(() => {
        audioRef.current.src = getPlaySong(currentSong.id)

        audioRef.current.play().then(() => {
            setPlaying(true)
        }).catch(() => {
            setPlaying(false)
        })
    }, [currentSong])

    const picUrl = (currentSong.al && currentSong.al.picUrl) || '';
    const singer = (currentSong.ar && currentSong.ar[0].name) || '未知歌手';
    const duration = currentSong.dt || 0
    const showDuration = formatDate(duration, "mm:ss");
    const showCurrentTime = formatDate(currentTime, "mm:ss");

    const playMusic = useCallback(debounce(() => {

        isPlaying ? audioRef.current.pause() : audioRef.current.play()

        setPlaying(!isPlaying)
    }, 200), [isPlaying])

    const changeMusic = (tag) => {
        dispatch(musicSwitching(tag))
    }


    const timeUpdate = (e) => {
        let currentTime = e.target.currentTime
        if (!isChange) {
            setCurrentTime(currentTime * 1000)
            setProgress((currentTime * 1000 / duration) * 100)
        }


        let i = 0;
        let length = lyricList.length;
        for (; i < length; i++) {
            let time = lyricList[i].time
            if (currentTime * 1000 < time) {
                break
            }
        }

        if(lyricIndex !== i - 1) {
            dispatch(playerLyricIndexAction(i - 1))
        }
    }

    const sliderChange = useCallback((e) => {
        setIsChange(true)
        let progress = e
        setCurrentTime(duration * (progress / 100))
        setProgress(progress)
    }, [duration])

    const sliderMuisc = useCallback((value) => {

        const currentTime = value / 100 * duration / 1000

        audioRef.current.currentTime = currentTime
        setIsChange(false)

        if (!isPlaying) {
            playMusic()
        }

    }, [duration, isPlaying, playMusic])

    const changeSequence = () => {
        dispatch(setPlayerSequence())
    }

    const musicEnded = () => {

        if (sequence === 2) {
            audioRef.current.currentTime = 0
        } else {
            dispatch(musicSwitching(1))
        }
        audioRef.current.play()
    }

    return (
        <PlaybarWrapper className="sprite_player">
            <ZAppCaption />
            <div className="content wrap-v2">
                <Control isPlaying={isPlaying}>
                    <button className="sprite_player prev" onClick={e => changeMusic(-1)}></button>
                    <button className="sprite_player play" onClick={e => playMusic(e)}></button>
                    <button className="sprite_player next" onClick={e => changeMusic(1)}></button>
                </Control>
                <PlayInfo>
                    <div className="image">
                        <a href="###">
                            <img src={setImageSize(picUrl, 35)} alt="" />
                        </a>
                    </div>
                    <div className="info">
                        <div className="song">
                            <span className="song-name">{currentSong.name}</span>
                            <a href="#/" className="singer-name">{singer}</a>
                        </div>
                        <div className="progress">
                            <Slider defaultValue={30}
                                value={progress}
                                onChange={sliderChange}
                                onAfterChange={sliderMuisc}
                                tooltipVisible={false} />
                            <div className="time">
                                <span className="now-time">{showCurrentTime}</span>
                                <span className="divider">/</span>
                                <span className="duration">{showDuration}</span>
                            </div>
                        </div>
                    </div>
                </PlayInfo>
                <Operator sequence={sequence}>
                    <div className="left">
                        <button className="sprite_player btn favor"></button>
                        <button className="sprite_player btn share"></button>
                    </div>
                    <div className="right sprite_player">
                        <button className="sprite_player btn volume"></button>
                        <button className="sprite_player btn loop" onClick={changeSequence}></button>
                        <button className="sprite_player btn playlist">
                            <span className="btn_num">{length}</span>
                        </button>
                    </div>
                </Operator>
            </div>
            <audio ref={audioRef}
                onTimeUpdate={e => timeUpdate(e)}
                onEnded={musicEnded} />
        </PlaybarWrapper>
    )
})

export default ZAppPlayerBar
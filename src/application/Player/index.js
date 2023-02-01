import React, { useEffect, useRef, useState } from 'react';

import {
  changePlaying,
  changeCurrentIndex,
  changeCurrentSong,
  changeFullScreen,
  changeMode,
  changePlayList,
  changeShowPlayList,
  changeSequencePlayList,
} from '../../store/features/player/playerSlice';
import MiniPlayer from './MiniPlayer';
import NormalPlayer from './NormalPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { playMode } from '../../api/config';
import { head, size } from 'lodash';

import { getSongUrl } from '../../api/utils';
import { useDeepCompareEffect } from 'ahooks';
import { findIndex } from 'lodash/array';
import { shuffle } from 'lodash/collection';

function Player(props) {
  const [currentTime, setCurrentTime] = useState(0); //  目前播放时间
  const [duration, setDuration] = useState(0); // 歌曲总时长
  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration; // 歌曲播放进度
  const [prevSong, setPrevSong] = useState({});
  const audioRef = useRef();
  const dispatch = useDispatch();
  const {
    fullScreen, // 播放器是否为全屏模式
    playing, // 当前歌曲是否播放
    sequencePlayList, // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
    playList,
    mode, // 播放模式
    currentIndex, // 当前歌曲在播放列表的索引位置
    showPlayList, // 是否展示播放列表
    // currentSong
  } = useSelector((state) => state.player);

  console.log(playList);

  const currentSong = {
    al: {
      picUrl:
        'https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg',
    },
    name: '木偶人',
    ar: [{ name: '薛之谦' }],
  };

  useEffect(() => {
    dispatch(changeCurrentIndex(0));
  }, []);

  useDeepCompareEffect(() => {
    if (
      !size(playList) ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === prevSong.id
    ) {
      return;
    }
    const currSong = playList[currentIndex];
    dispatch(changeCurrentSong(currSong));
    audioRef.current.src = getSongUrl(currSong.id);
    setPrevSong(currSong); // 保留上次播放的歌
    setDuration((currSong.dt / 1000) | 0); // 时长
  }, [playList, currentIndex]);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  const handleChangeFullScreen = (visible) => {
    dispatch(changeFullScreen(visible));
  };

  const handleClickPlaying = (e, state) => {
    e.stopPropagation();
    dispatch(changePlaying(state));
  };

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const handlePercentChange = (currentPercent) => {
    const newTime = currentPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      dispatch(changePlaying(true));
    }
  };

  // 只有一首歌时候单曲循环
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    dispatch(changePlaying(true));
    audioRef.current.play();
  };

  // 上一首
  const handlePrev = () => {
    const len = size(playList);
    if (len === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) index = len - 1;
    if (!playing) dispatch(changePlaying(true));
    dispatch(changeCurrentIndex(index));
  };

  // 上一首
  const handleNext = () => {
    const len = size(playList);
    if (len === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === len) index = 0;
    if (!playing) dispatch(changePlaying(true));
    dispatch(changeCurrentIndex(index));
  };

  const changeMode = () => {
    // const newMode = (mode + 1) % 3;
    if (mode === 0) {
      // 顺序模式
      dispatch(changePlayList(sequencePlayList));
      const index = findIndex(
        sequencePlayList,
        (song) => song.id === currentSong.id
      );
      dispatch(changeCurrentIndex(index));
    } else if (mode === 1) {
      // 单曲循环模式
      dispatch(changePlayList(sequencePlayList));
    } else if (mode === 2) {
      // 随机模式
      const newPlayList = shuffle(sequencePlayList);
      const index = findIndex(
        newPlayList,
        (song) => song.id === currentSong.id
      );
      dispatch(changePlayList(sequencePlayList));
      dispatch(changeCurrentIndex(index));
    }
  };

  return (
    <div>
      <MiniPlayer
        song={currentSong}
        fullScreen={fullScreen}
        playing={playing}
        percent={percent}
        toggleFullScreen={handleChangeFullScreen}
        clickPlaying={handleClickPlaying}
      />
      <NormalPlayer
        song={currentSong}
        fullScreen={fullScreen}
        playing={playing}
        duration={duration} // 总时长
        currentTime={currentTime} // 播放时间
        percent={percent} // 进度
        toggleFullScreen={handleChangeFullScreen}
        clickPlaying={handleClickPlaying}
        onPercentChange={handlePercentChange}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}></audio>
    </div>
  );
}

export default Player;

import React from 'react';

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

function Player(props) {
  const dispatch = useDispatch();
  const { fullScreen } = useSelector((state) => state.player);
  const currentSong = {
    al: {
      picUrl:
        'https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg',
    },
    name: '木偶人',
    ar: [{ name: '薛之谦' }],
  };
  const handleChangeFullScreen = (visible) => {
    dispatch(changeFullScreen(visible));
  };

  return (
    <div>
      <MiniPlayer
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={handleChangeFullScreen}
      />
      <NormalPlayer
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={handleChangeFullScreen}
      />
    </div>
  );
}

export default Player;

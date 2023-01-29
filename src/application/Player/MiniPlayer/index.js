import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { getName } from '../../../api/utils';
import { MiniPlayerContainer } from './style';
import { CSSTransition } from 'react-transition-group';

function MiniPlayer(props) {
  const { song, fullScreen, toggleFullScreen } = props;
  const miniPlayerRef = useRef();
  return (
    <CSSTransition
      classNames="mini"
      in={!fullScreen}
      timeout={400}
      onEnter={() => {
        miniPlayerRef.current.style.display = 'flex';
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = 'none';
      }}
    >
      <MiniPlayerContainer
        ref={miniPlayerRef}
        onClick={() => toggleFullScreen(true)}
      >
        <div className="icon">
          <div className="imgWrapper">
            <img
              className="play"
              src={song.al.picUrl}
              width="40"
              height="40"
              alt="img"
            />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <i className="iconfont">&#xe650;</i>
        </div>
        <div className="control">
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
}

MiniPlayer.propTypes = {
  song: PropTypes.object,
  fullScreen: PropTypes.bool,
  toggleFullScreen: PropTypes.func,
};

export default React.memo(MiniPlayer);
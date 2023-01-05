import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../baseUI/header';
import Scroll from '../../baseUI/scroll';
import { Container, TopDesc, Menu, SongList, SongItem } from './style';
import { getCount, getName, isEmptyObject } from '../../api/utils';
import { getAlbumDetail } from '../../store/features/album/requestAction';
import Loading from '../../baseUI/loading';

import style from '../../assets/global-style';

export const HEADER_HEIGHT = 45;

function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState('歌单');
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯
  const headRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();

  const { currentAlbum, enterLoading } = useSelector((state) => state.album);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlbumDetail(id));
  }, [id]);

  const handleOnExited = () => {
    navigate('/recommend');
  };

  const handleBack = () => {
    setShowStatus(false);
  };

  const handleScroll = (pos) => {
    const minScroll = -HEADER_HEIGHT;
    const percent = Math.abs(pos.y / minScroll);
    const headerDom = headRef.current;
    if (pos.y < minScroll) {
      headerDom.style.background = style['theme-color'];
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else {
      headerDom.style.backgroundColor = '';
      headerDom.style.opacity = 1;
      setTitle('歌单');
      setIsMarquee(false);
    }
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={handleOnExited}
    >
      <div>
        <Container>
          {enterLoading ? <Loading /> : null}
          <Header
            title={title}
            onClick={handleBack}
            ref={headRef}
            isMarquee={isMarquee}
          ></Header>
          {isEmptyObject(currentAlbum) ? null : (
            <Scroll bounceTop={false} onScroll={handleScroll}>
              <div>
                <TopDesc background={currentAlbum.coverImgUrl}>
                  <div className="background">
                    <div className="filter"></div>
                  </div>
                  <div className="img_wrapper">
                    <div className="decorate"></div>
                    <img src={currentAlbum.coverImgUrl} alt="" />
                    <div className="play_count">
                      <i className="iconfont play">&#xe885;</i>
                      <span className="count">
                        {Math.floor(currentAlbum.subscribedCount / 1000) / 10}{' '}
                        万{' '}
                      </span>
                    </div>
                  </div>
                  <div className="desc_wrapper">
                    <div className="title">{currentAlbum.name}</div>
                    <div className="person">
                      <div className="avatar">
                        <img src={currentAlbum.creator.avatarUrl} alt="" />
                      </div>
                      <div className="name">
                        {currentAlbum.creator.nickname}
                      </div>
                    </div>
                  </div>
                </TopDesc>
                <Menu>
                  <div>
                    <i className="iconfont">&#xe6ad;</i>
                    评论
                  </div>
                  <div>
                    <i className="iconfont">&#xe86f;</i>
                    点赞
                  </div>
                  <div>
                    <i className="iconfont">&#xe62d;</i>
                    收藏
                  </div>
                  <div>
                    <i className="iconfont">&#xe606;</i>
                    更多
                  </div>
                </Menu>
                <SongList>
                  <div className="first_line">
                    <div className="play_all">
                      <i className="iconfont">&#xe6e3;</i>
                      <span>
                        {' '}
                        播放全部{' '}
                        <span className="sum">
                          (共 {currentAlbum.tracks.length} 首)
                        </span>
                      </span>
                    </div>
                    <div className="add_list">
                      <i className="iconfont">&#xe62d;</i>
                      <span>
                        {' '}
                        收藏 ({getCount(currentAlbum.subscribedCount)})
                      </span>
                    </div>
                  </div>
                  <SongItem>
                    {currentAlbum.tracks.map((item, index) => {
                      return (
                        <li key={index}>
                          <span className="index">{index + 1}</span>
                          <div className="info">
                            <span>{item.name}</span>
                            <span>
                              {getName(item.ar)} - {item.al.name}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </SongItem>
                </SongList>
              </div>
            </Scroll>
          )}
        </Container>
      </div>
    </CSSTransition>
  );
}

export default React.memo(Album);

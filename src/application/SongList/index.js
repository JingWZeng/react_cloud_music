import React from 'react';
import { SongList, SongItem } from './style';
import { getName } from '../../api/utils';
import { forEach } from 'lodash';
import { nanoid } from 'nanoid';

const SongsList = React.forwardRef((props, refs) => {
  const { showBackground, collectCount, showCollect, songs } = props;
  const totalCount = songs.length;

  const songList = (list) => {
    const result = [];
    forEach(list, (item, index) => {
      result.push(
        <li key={nanoid()} onClick={(e) => selectItem(e, index)}>
          <span className="index">{index + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists)} -
              {item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      );
    });
    return result;
  };

  const selectItem = (e, index) => {
    console.log(e, index);
  };

  const collect = (count) => {
    return (
      <div className="add_list">
        <i className="iconfont">&#xe62d;</i>
        <span> 收藏 ({Math.floor(count / 1000) / 10} 万)</span>
      </div>
    );
  };

  return (
    <SongList ref={refs} showBackground={showBackground}>
      <div className="first_line">
        <div className="play_all" onClick={(e) => selectItem(e, 0)}>
          <i className="iconfont">&#xe6e3;</i>
          <span>
            播放全部 <span className="sum">(共 {totalCount} 首)</span>
          </span>
        </div>
        {showCollect ? collect(collectCount) : null}
      </div>
      <SongItem>{songList(songs)}</SongItem>
    </SongList>
  );
});

export default React.memo(SongsList);

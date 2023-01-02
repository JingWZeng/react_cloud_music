import React, { useEffect } from 'react';
import { useMount } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';
import { map } from 'lodash';
import styled from 'styled-components';

import { getRankList } from '../../store/features/rank/requestAction';
import { filterIndex, filterIdx } from '../../api/utils';

import { Container, List, ListItem, SongList } from './style';
import Scroll from '../../baseUI/scroll';
import Loading from '../../baseUI/loading';

export const EnterLoading = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
  margin: auto;
`;

function Rank(props) {
  const { loading, rankList } = useSelector((state) => state.rank);
  const dispatch = useDispatch();

  useMount(() => {
    if (!rankList.length) {
      dispatch(getRankList());
    }
  });

  const globalStartIndex = filterIndex(rankList);
  const officialList = rankList.slice(0, globalStartIndex);
  const globalList = rankList.slice(globalStartIndex);

  const enterDetail = (name) => {
    const idx = filterIdx(name);
    if (idx === null) {
      alert('暂无相关数据');
    }
  };

  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {map(list, (item) => {
          return (
            <ListItem
              key={item.coverImgId}
              tracks={item.tracks}
              onClick={() => enterDetail(item.name)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          );
        })}
      </List>
    );
  };

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {map(list, (item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </SongList>
    ) : null;
  };

  const displayStyle = loading ? { display: 'none' } : { display: '' };

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>
            {' '}
            官方榜{' '}
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            {' '}
            全球榜{' '}
          </h1>
          {renderRankList(globalList, true)}
          {loading ? (
            <EnterLoading>
              <Loading />
            </EnterLoading>
          ) : null}
        </div>
      </Scroll>
    </Container>
  );
}

export default React.memo(Rank);

import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { Top, Tab, TabItem } from './style';
import Player from '../Player';

function Home(props) {
  const activeStyle = {
    fontSize: 18,
  };

  return (
    <>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink
          to="/recommend"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <TabItem>
            <span> 推荐 </span>
          </TabItem>
        </NavLink>
        <NavLink
          to="/singers"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <TabItem>
            <span> 歌手 </span>
          </TabItem>
        </NavLink>
        <NavLink
          to="/rank"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <TabItem>
            <span> 排行榜 </span>
          </TabItem>
        </NavLink>
      </Tab>
      <Outlet />
      <Player />
    </>
  );
}

export default React.memo(Home);

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import style from '../../assets/global-style';

const HeaderContainer = styled.div`
  position: fixed;
  padding: 0 10px 5px 10px;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: dimgrey;

  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }

  > h1 {
    font-size: ${style['font-size-l']};
    font-weight: 700;
  }
`;

const Header = (props) => {
  const { onClick, title } = props;
  return (
    <HeaderContainer onClick={onClick}>
      <i className="iconfont back">&#xe655;</i>
      <h1>{title}</h1>
    </HeaderContainer>
  );
};

Header.defaultProps = {
  onClick: () => {},
  title: '标题',
};

Header.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default React.memo(Header);

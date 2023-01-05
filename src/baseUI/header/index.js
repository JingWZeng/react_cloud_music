import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Marquee from 'react-fast-marquee';

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

const Header = forwardRef((props, ref) => {
  const { onClick, title, isMarquee } = props;
  return (
    <HeaderContainer onClick={onClick} ref={ref}>
      <i className="iconfont back">&#xe655;</i>
      {isMarquee ? (
        <Marquee gradient={false}>
          <h1>{title}</h1>
        </Marquee>
      ) : (
        <h1>{title}</h1>
      )}
    </HeaderContainer>
  );
});

Header.defaultProps = {
  onClick: () => {},
  title: '标题',
  isMarquee: false,
};

Header.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool,
};

export default Header;

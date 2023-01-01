import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { forEach, map } from 'lodash';
import styled from 'styled-components';

import style from '../../assets/global-style';
import Scroll from '../scroll';

const List = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  overflow: hidden;

  > span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style['font-size-m']};
    vertical-align: middle;
  }
`;
const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style['font-size-m']};
  padding: 5px 8px;
  border-radius: 10px;

  &.selected {
    color: ${style['theme-color']};
    border: 1px solid ${style['theme-color']};
    opacity: 0.8;
  }
`;

function HorizontalItem(props) {
  const { list, currValue, title } = props;
  const { onClick } = props;

  const categoryRef = useRef(null);

  useEffect(() => {
    // Scroll滚动的条件是内部宽度大于外部容器宽度
    const categoryDom = categoryRef.current;
    const tagElems = categoryDom.querySelectorAll('span');
    let totalWidth = 0;
    forEach(Array.from(tagElems), (elem) => {
      totalWidth += elem.offsetWidth;
    });
    categoryDom.style.width = `${totalWidth}px`;
  }, []);

  return (
    <Scroll direction={'horizontal'}>
      <div ref={categoryRef}>
        <List>
          <span>{title}</span>
          {map(list, (item) => {
            return (
              <ListItem
                key={item.key}
                className={`${currValue === item.key ? 'selected' : ''}`}
                onClick={() => onClick(item.key)}
              >
                {item.name}
              </ListItem>
            );
          })}
        </List>
      </div>
    </Scroll>
  );
}

// list 为接受的列表数据
// currValue 为当前的 item 值
// title 为列表左边的标题
// onClick 为点击不同的 item 执行的方法

HorizontalItem.defaultProps = {
  list: [],
  currValue: '',
  title: '',
  onClick: null,
};

HorizontalItem.propTypes = {
  list: PropTypes.array,
  currValue: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};
export default React.memo(HorizontalItem);

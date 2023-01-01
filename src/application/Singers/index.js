import React, { useState } from 'react';
import HorizontalItem from '../../baseUI/horizontalItem';

import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer } from './style';

function Singers(props) {
  const [category, setCategory] = useState('1001');
  const [alpha, setAlpha] = useState('A');

  const handleUpdateCategory = (value) => {
    setCategory(value);
  };

  const handleUpdateAlpha = (value) => {
    setAlpha(value);
  };

  return (
    <NavContainer>
      <HorizontalItem
        list={categoryTypes}
        title={'分类 (默认热门):'}
        currValue={category}
        onClick={handleUpdateCategory}
      ></HorizontalItem>
      <HorizontalItem
        list={alphaTypes}
        title={'首字母:'}
        currValue={alpha}
        onClick={handleUpdateAlpha}
      ></HorizontalItem>
    </NavContainer>
  );
}

export default React.memo(Singers);

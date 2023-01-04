import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';

import Header from '../../baseUI/header';
import { Container } from './style';

function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const navigate = useNavigate();

  const handleOnExited = () => {
    navigate('/recommend');
  };

  const handleBack = () => {
    setShowStatus(false);
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
          <Header title={'返回'} onClick={handleBack}></Header>
        </Container>
      </div>
    </CSSTransition>
  );
}

export default React.memo(Album);

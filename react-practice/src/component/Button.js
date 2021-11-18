import React from 'react';
import classNames from 'classnames';
import '../styles/Button.scss';

// size 종류에는 large, medium, small로 구분
function Button({ children, size, color, outline, fullWidth }) {
  return (
    <button
      className={classNames('Button', size, color, {
        outline,
        fullWidth,
      })}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: 'medium',
  color: 'blue',
};
export default Button;

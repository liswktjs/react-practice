import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import styles from '../styles/CheckBox.module.css';
import classNames from 'classnames';

const cx = classNames.bind(styles);
// class 이름으로 cx.bind(클래스 이름들 'checkbox','outlined') 넣으면 class 이름을 간편히 쓸수 있다
function CheckBox({ checked, children, ...rest }) {
  return (
    <div className={styles.checkbox}>
      <label>
        <input type="checkbox" checked={checked} {...rest} />
        <div className={styles.icon}>
          {checked ? (
            <MdCheckBox className={styles.checked} />
          ) : (
            <MdCheckBoxOutlineBlank />
          )}
        </div>
      </label>
      <span>{children}</span>
    </div>
  );
}

export default CheckBox;

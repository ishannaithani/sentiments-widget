import React from 'react';
import styles from './wrapper.module.scss';

export const AppWrapper = ({ children }) => {
  return <div className={styles.appWrapper}>
    <div className={styles.appContent}>
      {
        children
      }
    </div>
  </div>
};
import React from 'react';
import PropTypes from 'prop-types';
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

AppWrapper.propTypes = {
  children: PropTypes.element.isRequired
}

AppWrapper.defaultProps = {
  children: <>No Children passed in props</>
}
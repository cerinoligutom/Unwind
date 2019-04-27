import React from 'react';
import styles from './Loading.module.scss';

export const Loading = () => {
  return (
    <>
      <div className={styles.spinner}>
        <div className={styles.cube1} />
        <div className={styles.cube2} />
      </div>
    </>
  );
};

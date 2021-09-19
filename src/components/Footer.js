import React from 'react';
import { FOOTER_TEXT } from '../constants/general';

export const Footer = () => {
  return <div style={styles.container}>{FOOTER_TEXT}</div>;
};

const styles = {
  container: {
    backgroundColor: '#01182b',
    height: 100,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    padding: '0 20px 0 20px',
  },
};

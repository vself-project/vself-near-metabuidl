import React from 'react';

const FOOTER_TEXT = 'Footer text';

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

import React from 'react';

const FOOTER_TEXT = 'Footer text';

export const Footer = () => {
  return <div style={styles.container}>{FOOTER_TEXT}</div>;
};

const styles = {
  container: {
    backgroundColor: 'pink',
    height: 100,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
};

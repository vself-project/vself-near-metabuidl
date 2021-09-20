import React from 'react';
import Link from 'next/link';
import { FOOTER_TEXT, GITHUB_PAGE } from '../constants/general';

export const Footer = () => {
  return (
    <div style={styles.container}>
      {FOOTER_TEXT[0]}
      <Link href={GITHUB_PAGE}>
        <a style={styles.link}>{FOOTER_TEXT[1]}</a>
      </Link>
      {FOOTER_TEXT[2]}
    </div>
  );
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
  link: {
    margin: '0 4px 0 4px',
    fontWeight: 'bold',
  },
};

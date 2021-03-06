import React from 'react';
import { Button } from './Button';
import { del } from '../utils/storage';
import { STORAGE_BALANCE_KEY } from '../constants/general';

export const Header = ({ wallet, account }) => {
  const signOut = () => {
    del(STORAGE_BALANCE_KEY);
    wallet.signOut();
  };

  if (wallet && wallet.signedIn) {
    return (
      <div style={styles.container}>
        <div style={styles.accountData}>
          <p style={styles.accountId}>{account.accountId + ':'}</p>
          <p style={styles.accountId}>{wallet.balance}</p>
        </div>
        <Button label={'Sign Out'} onClick={signOut} />
      </div>
    );
  }

  return (
    <div style={{ ...styles.container, ...styles.flexEnd }}>
      <Button label={'Sign In'} onClick={() => wallet.signIn()} />
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#01182b',
    height: 80,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    padding: '0 20px 0 20px',
  },
  accountData: {
    display: 'flex',
    flexDirection: 'row',
  },
  accountId: {
    marginRight: 10,
    fontSize: 17,
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
};

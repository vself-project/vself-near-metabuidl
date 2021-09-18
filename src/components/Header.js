import React from 'react';

export const Header = ({ wallet, account }) => {
  if (wallet && wallet.signedIn) {
    return (
      <div style={styles.container}>
        <div>
          <p>{account.accountId}</p>
          <p>{wallet.balance}</p>
        </div>
        <button onClick={() => wallet.signOut()}>{'Sign Out'}</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <></>
      <button onClick={() => wallet.signIn()}>{'Sign In'}</button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'pink',
    height: 100,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

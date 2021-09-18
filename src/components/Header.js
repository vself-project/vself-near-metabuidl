import React from 'react';

export const Header = ({ wallet, account }) => {
  if (wallet && wallet.signedIn) {
    return (
      <div style={styles.container}>
        <div style={styles.accountData}>
          <p style={styles.accountId}>{account.accountId + ':'}</p>
          <p>{wallet.balance}</p>
        </div>
        <button style={styles.button} onClick={() => wallet.signOut()}>
          {'Sign Out'}
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <></>
      <button style={styles.button} onClick={() => wallet.signIn()}>
        {'Sign In'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#01182b',
    height: 60,
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
  },
  button: {
    margin: 0,
  },
};

const contractName = 'dev-1632088006637-63596372194923';

module.exports = function getConfig(isServer = false) {
  let config = {
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    contractName,
  };

  if (process.env.REACT_APP_ENV !== undefined) {
    config = {
      ...config,
      contractMethods: {
        changeMethods: ['new', 'play'],
        viewMethods: ['get_balance', 'get_nft_total_balance'],
      },
      GAS: '200000000000000',
      DEFAULT_NEW_ACCOUNT_AMOUNT: '20',
    };
  }

  if (process.env.REACT_APP_ENV === 'prod') {
    config = {
      ...config,
      networkId: 'testnet',
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      contractName: 'lootbox.vself.testnet',
    };
  }

  return config;
};

const contractName = 'lootbox.vself.testnex'; // Where staging contract is deployed

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

  return config;
};

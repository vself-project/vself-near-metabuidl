const contractName = 'dev-1632056085447-91857424362241';

module.exports = function getConfig(isServer = false) {
  let config = {
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    contractName,    
  };  

  if (process.env.REACT_APP_ENV !== undefined) {
    config = {
      ...config,
      contractMethods: {
        changeMethods: ["new", "play"],
        viewMethods: ["get_balance"],
      },
      GAS: "200000000000000",
      DEFAULT_NEW_ACCOUNT_AMOUNT: "20",      
    };
  }

  if (process.env.REACT_APP_ENV === "prod") {
    config = {
      ...config,
      networkId: "mainnet",
      nodeUrl: "https://rpc.mainnet.near.org",
      walletUrl: "https://wallet.near.org",
      helperUrl: "https://helper.mainnet.near.org",
      contractName: "near",
    };
  }

  return config;
};

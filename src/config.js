const contractName = 'dev-1631686235516-94222184629487';

module.exports = function getConfig(isServer = false) {
  let config = {
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    contractName,
    contractMethods: {
      changeMethods: ["new", "deposit", "play"],
      viewMethods: ["get_credits"],
    },
  };  

  if (process.env.REACT_APP_ENV !== undefined) {
    config = {
      ...config,
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

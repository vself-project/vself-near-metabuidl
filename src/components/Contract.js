import React, { useEffect, useState } from 'react';
import * as nearAPI from 'near-api-js';
import { GAS, parseNearAmount } from '../state/near';
import Image from 'next/image';
import { createAccessKeyAccount, getContract } from '../utils/near-utils';

import getConfig from '../config';
import backgroundImage from '../public/background.jpg';
import { Achivements } from '../components/Achivements';

const {
  KeyPair,
  utils: {
    format: { formatNearAmount },
  },
} = nearAPI;

const { networkId, nodeUrl, walletUrl, nameSuffix, contractName, contractMethods } = getConfig();

const INSTRUCTIONS =
  'Welcome to Lootbox game! \n Here, you have a chance to win one of our amazing NFTs. Give it a try! Connect your NEAR wallet to collect it.';

export const Contract = ({ near, update, account }) => {
  if (!account) return null;
  console.log('Account:', account);

  const [credits, setCredits] = useState('');
  const [amount, setAmount] = useState('');
  const [flips, setFlips] = useState([]);

  useEffect(() => {
    updateCredits();
  }, []);

  // It allows input element to accept only digits
  const validateNumericInput = (value) => {
    if (!Number(value) && value !== '') {
      return;
    }
    if (value.slice(-1) == '.') {
      value = value.slice(0, -1);
    }
    setAmount(value);
  };

  const updateCredits = async () => {
    //const contract = new Contract(account, contractName, { ...contractMethods });
    console.log('Contract name:', contractName);
    console.log('Contract methods:', contractMethods);
    const contract = getContract(account);
    console.log('Contract:', contract);
    setCredits(await contract.get_balance({ account_id: account.accountId }));
  };

  const handlePlay = async () => {
    const contract = getContract(account);
    const outcome = await contract.play({}, GAS, parseNearAmount(amount));
    console.log('Game result:', outcome);
    flips.push(true);
    updateCredits();
  };

  return (
    <span>
      <div style={styles.container}>
        <Achivements />
        <p>Current Balance: {formatNearAmount(credits, 0)}</p>
        <div style={styles.instructions}>{INSTRUCTIONS}</div>
        <div style={styles.gameContainer}>
          <input
            placeholder='Amount (N)'
            value={amount}
            onChange={(e) => validateNumericInput(e.target.value)}
            style={styles.input}
          />
          <button onClick={() => handlePlay()} style={styles.button}>
            Play
          </button>
        </div>

        {flips.map((f, i) => (f ? <p key={i}>Won</p> : <p key={i}>Lost</p>))}
      </div>
      <Image src={backgroundImage} alt='No image' width={700} height={500} layout='responsive' />
    </span>
  );
};

const styles = {
  container: {
    minWidth: 700,
    width: '100%',
    height: 500,
    backgroundColor: 'rgba(255,255,255,0.8)',
    position: 'absolute',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    width: 450,
    backgroundColor: 'white',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'pre-line',
    textAlign: 'center',
    padding: '10px 10px 10px 10px',
    fontSize: 20,
  },
  gameContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px 0px 10px 0px',
  },
  input: {
    width: 100,
    margin: '0 20px 0 0',
  },
  button: {
    margin: 0,
  },
};

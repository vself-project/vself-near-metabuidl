import React, { useEffect, useState } from 'react';
import * as nearAPI from 'near-api-js';
import { GAS, parseNearAmount } from '../state/near';
import Image from 'next/image';
import { createAccessKeyAccount, getContract } from '../utils/near-utils';

import getConfig from '../config';
import backgroundImage from '../public/background.jpg';
import { Achivements } from './Achivements';
import { Button } from './Button';
import { Modal } from './Modal';
import { INSTRUCTIONS } from '../constants/general';

const {
  KeyPair,
  utils: {
    format: { formatNearAmount },
  },
} = nearAPI;

const { networkId, nodeUrl, walletUrl, nameSuffix, contractName, contractMethods } = getConfig();

export const Contract = ({ near, update, wallet, account }) => {
  const [balance, setBalance] = useState('');
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newAward, setNewAward] = useState(null);

  useEffect(() => {
    updateBalance();
  }, [account]);

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

  const updateBalance = async () => {
    if (!account) return;
    //const contract = new Contract(account, contractName, { ...contractMethods });
    console.log('Contract name:', contractName);
    console.log('Contract methods:', contractMethods);
    const contract = getContract(account);
    console.log('Contract:', contract);
    const balance = await contract.get_balance({ account_id: account.accountId });
    console.log('Rewards balance:', balance);
    console.log('Gas', GAS);
    setBalance(balance);
  };

  const handlePlay = async () => {
    const contract = getContract(account);
    const gas = '200000000000000';
    const outcome = await contract.play({}, gas, parseNearAmount(amount));
    console.log('Game result:', outcome);
    setNewAward(outcome);
    setShowModal(true);
    updateBalance();
  };

  if (wallet && wallet.signedIn) {
    return (
      <div>
        {showModal && <Modal award={newAward} onClick={() => setShowModal(false)} />}

        <div style={styles.container}>
          <Achivements counters={balance} />
          <div style={styles.instructions}>{INSTRUCTIONS}</div>
          <div style={styles.gameContainer}>
            <input
              placeholder='Amount (N)'
              value={amount}
              onChange={(e) => validateNumericInput(e.target.value)}
              style={styles.input}
            />
            <Button label={'Play'} style={{ normal: styles.button }} onClick={() => handlePlay()} />
          </div>
        </div>

        <Image
          src={backgroundImage}
          alt='No image'
          width={1500}
          height={1000}
          layout='responsive'
        />
      </div>
    );
  } else {
    return (
      <div>
        <div style={styles.container}>
          <div style={styles.instructions}>{INSTRUCTIONS}</div>
        </div>
        <Image src={backgroundImage} alt='No image' width={700} height={500} layout='responsive' />
      </div>
    );
  }
};

const styles = {
  container: {
    minWidth: 800,
    width: '100%',
    height: 700,
    //backgroundColor: 'rgba(255,255,255,0.8)',
    position: 'absolute',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    width: 450,
    backgroundColor: 'rgba(255,255,255,0.7)',
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
    width: 120,
    height: 40,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    border: '1px solid gray',
    margin: '0 20px 0 0',
    padding: '0 0 0 10px',
    fontSize: 15,
  },
  button: {
    margin: 0,
    padding: '10px 30px 10px 30px',
    fontSize: 18,
  },
};

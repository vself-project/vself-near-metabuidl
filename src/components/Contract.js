import React, { useEffect, useState } from 'react';
import { GAS, parseNearAmount } from '../state/near';
import { get, set } from '../utils/storage';
import Image from 'next/image';
import { getContract } from '../utils/near-utils';

import getConfig from '../config';
import backgroundImage from '../public/background.jpg';
import { Achivements } from './Achivements';
import { Button } from './Button';
import { Modal } from './Modal';
import { INSTRUCTIONS, GAME_COST, NFT_SUPPLIES } from '../constants/general';

const { contractName, contractMethods } = getConfig();

export const Contract = ({ near, update, wallet, account }) => {
  const [balance, setBalance] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newAward, setNewAward] = useState(null);

  useEffect(() => {
    updateBalance();
  }, [account]);

  // Check if user has won the nft
  useEffect(() => {
    if (balance === '') return;
    const oldBalance = get('OLD_BALANCE');
    if (Object.keys(oldBalance).length == 0) return;
    for (var i = 0; i < oldBalance.length; i++) {
      if (oldBalance[i] == balance[i]) continue;
      set('OLD_BALANCE', balance);
      setNewAward(i);
      setShowModal(true);
    }
  }, [balance]);

  const updateBalance = async () => {
    if (!account) return;
    //const contract = new Contract(account, contractName, { ...contractMethods });
    console.log('Contract name:', contractName);
    console.log('Contract methods:', contractMethods);
    const contract = getContract(account);
    console.log('Contract:', contract);
    const balance = await contract.get_balance({ account_id: account.accountId });
    const nftTotalBalance = await contract.get_nft_total_balance();
    console.log('Rewards balance:', balance);
    console.log('Gas', GAS);
    setBalance(balance);
  };

  const handlePlay = async () => {
    const contract = getContract(account);
    const gas = '200000000000000';
    const balance = await contract.get_balance({ account_id: account.accountId });
    set('OLD_BALANCE', balance);
    const outcome = await contract.play({}, gas, parseNearAmount(GAME_COST));
    console.log('Game result:', outcome);
  };

  if (wallet && wallet.signedIn) {
    return (
      <div>
        {showModal && <Modal award={newAward} onClick={() => setShowModal(false)} />}

        <div style={styles.container}>
          <Achivements counters={balance} supplies={NFT_SUPPLIES} />
          <div style={styles.instructions}>{INSTRUCTIONS}</div>
          <div style={styles.gameContainer}>
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
    height: 650,
    position: 'absolute',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    width: 480,
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
  button: {
    margin: 0,
    padding: '10px 30px 10px 30px',
    fontSize: 18,
  },
};

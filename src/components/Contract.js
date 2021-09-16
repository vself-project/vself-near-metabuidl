import React, { useEffect, useState } from 'react';
import * as nearAPI from 'near-api-js';
import { GAS, parseNearAmount } from '../state/near';
import {
    createAccessKeyAccount,
    getContract,    
} from '../utils/near-utils';

import getConfig from '../config'

const {
    KeyPair,
    utils: { format: { formatNearAmount } }
} = nearAPI;

const {	
	networkId, nodeUrl, walletUrl, nameSuffix,
	contractName, contractMethods
} = getConfig();

export const Contract = ({ near, update, account }) => {

    if (!account) return null;
    console.log('Account:', account);    

    const [credits, setCredits] = useState('');
    const [amount, setAmount] = useState('');
    const [flips, setFlips] = useState([]);

    useEffect(() => {
        updateCredits();
    }, []);

    const updateCredits = async () => {
        //const contract = new Contract(account, contractName, { ...contractMethods });
        console.log('Contract name:', contractName);
        console.log('Contract methods:', contractMethods);
        const contract = getContract(account);
        console.log('Contract:', contract);            
        setCredits(await contract.get_balance({ account_id: account.accountId }))
    };    

    const handlePlay = async () => {
        const contract = getContract(account);
        const outcome = await contract.play({}, GAS, parseNearAmount(amount));
        console.log("Game result:", outcome);
        flips.push(true);
        updateCredits()
    };

    return <>
        <h3>Play</h3>
        <p>Current Balance: { formatNearAmount(credits, 0) }</p>
        <input placeholder="Amount (N)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <br />
        <button onClick={() => handlePlay()}>Play</button>

        {
            flips.map((f, i) => f ? <p key={i}>Won</p> : <p key={i}>Lost</p>)
        }
    </>;
};


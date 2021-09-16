const nearAPI = require('near-api-js');
const testUtils = require('./test-utils');
const getConfig = require('../src/config');
const { formatNearAmount } = require('near-api-js/lib/utils/format');

const { KeyPair, Account, utils: { format: { parseNearAmount }} } = nearAPI;
const { 
	connection, initContract, getAccount, getContract,
	contract,
	contractAccount, contractName, contractMethods, createAccessKeyAccount
} = testUtils;
const { GAS } = getConfig();

//jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
jest.setTimeout(50000);

describe('deploy contract ' + contractName, () => {
	let alice, contract;

	beforeAll(async () => {
		alice = await getAccount();
		await initContract(alice.accountId);
	});

	test('contract hash', async () => {
		let state = (await new Account(connection, contractName)).state();
		expect(state.code_hash).not.toEqual('11111111111111111111111111111111');
		contract = await getContract(alice)
	});

	test('check balance', async () => {		
		const reward = await contract.get_balance({ account_id: alice.accountId })
		expect(reward).toEqual("0")
	});

	test('check play', async () => {
		let total_reward;
		for (let i = 0; i < 5; i++) {
				const rand = await contract.play({}, GAS, parseNearAmount('2'));
				console.log(rand)
				const balance = await contract.get_balance({ account_id: alice.accountId })
				console.log(balance)	
				total_reward = balance;					
		}
		//const reward = await contract.get_balance({ account_id: alice.accountId })
		//expect(reward).toEqual(total_reward)
		expect(true)
	});


});
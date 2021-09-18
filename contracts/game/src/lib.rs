use borsh::{ BorshDeserialize, BorshSerialize };
use near_sdk::{ext_contract};
use near_sdk::{
    env, near_bindgen, AccountId, Gas, Balance, PublicKey, Promise, PromiseResult,
    collections::{ UnorderedMap },
    json_types::{ U128, Base58PublicKey, ValidAccountId },
};
use serde::Serialize;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

const ONE_NEAR:u128 = 1_000_000_000_000_000_000_000_000;
const PROB:u8 = 255; // 100%

const GAS_FOR_RESOLVE_TRANSFER: Gas = 10_000_000_000_000;
const GAS_FOR_NFT_TRANSFER_CALL: Gas = 25_000_000_000_000 + GAS_FOR_RESOLVE_TRANSFER;
const NO_DEPOSIT: Balance = 0;
const MIN_ATTACHED_DEPOSIT: u128 = 100_000_000_000_000_000_000_000;
pub type TokenId = String;

#[near_bindgen]

#[derive(BorshDeserialize, BorshSerialize)]
pub struct LootboxGame {
    pub owner_id: AccountId,
    pub rewards: UnorderedMap<AccountId, Balance>,
}

impl Default for LootboxGame {
    fn default() -> Self {
        panic!("Should be initialized before usage")
    }
}

#[near_bindgen]
impl LootboxGame {
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        assert!(env::is_valid_account_id(owner_id.as_bytes()), "Invalid owner account");
        assert!(!env::state_exists(), "Already initialized");
        Self {
            owner_id,
            rewards: UnorderedMap::new(b"rewards".to_vec()),
        }
    }
    
    #[payable]
    pub fn play(&mut self) -> Promise {
        let account_id = env::signer_account_id();
        let deposit = env::attached_deposit();
        let owner_id = env::current_account_id().to_string();
        
        assert!(deposit > (ONE_NEAR - 1), "not enough currency to play");        
        
        // Toss the dice (minimal logic for now)
        let rand: u8 = *env::random_seed().get(0).unwrap();
        let token_id: TokenId = "COMMON".to_string();
        let memo: String = "Congrats!".to_string();

        if rand < PROB {            
            // Game rules TO DO upgrade
        }

        // Transfer reward to the player
        // call NFT contract transfer call function
        ext_nft::nft_transfer(
            account_id.clone(),
            token_id.clone(),
            owner_id, // lootbox contracti is the owner
            memo,
            &"nft.vself.testnet",
            1,
            env::prepaid_gas() - GAS_FOR_NFT_TRANSFER_CALL,
        ).then(ext_self::nft_resolve_outcome(
            "nft.vself.testnet".to_string(),
            token_id,
            account_id,
            &env::current_account_id(),
            NO_DEPOSIT,
            GAS_FOR_RESOLVE_TRANSFER,
        ))
    }

    /// self callback
    pub fn nft_resolve_outcome(
        &mut self,
        token_contract_id: AccountId,
        token_id: TokenId,
        winner_id: AccountId,
    ) -> bool {
        env::log(format!("Promise Result {:?}", env::promise_result(0)).as_bytes());
        let contract_and_token_id = format!("{}:{}", token_contract_id, token_id);
        // value is nothing, checking if nft_transfer was Successful promise execution
        if let PromiseResult::Successful(_value) = env::promise_result(0) {            
            // Update rewards balance
            let mut balance = self.rewards.get(&winner_id).unwrap_or(0);
            balance = balance + 1;
            self.rewards.insert(&winner_id, &balance);
            return true;
        }
        // no promise result        
        return false;
    }


    /// Views
    pub fn get_balance(&self, account_id: AccountId) -> U128 {
        self.rewards.get(&account_id).unwrap_or(0).into()
    }

    pub fn get_nft_balance(&self, account_id: AccountId) -> U128 {
        self.rewards.get(&account_id).unwrap_or(0).into()
    }    
}

/// External contract interface
#[ext_contract(ext_nft)]
trait NonFungibleToken {
    fn nft_transfer(
        &mut self,
        receiver_id: AccountId,
        token_id: TokenId,
        enforce_owner_id: AccountId,
        memo: String,
    );

    // view method
    fn nft_token(&self, token_id: String) -> Option<Token>;
}



#[ext_contract(ext_self)]
trait ResolvePurchase {
    fn nft_resolve_outcome(
        &mut self,
        token_contract_id: AccountId,
        token_id: TokenId,
        buyer_id: AccountId,
    ) -> Promise;
}



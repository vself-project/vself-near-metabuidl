use borsh::{ BorshDeserialize, BorshSerialize };
use near_sdk::{ext_contract};
use near_sdk::{
    env, near_bindgen, AccountId, Gas, Balance, Promise, PromiseResult,
    collections::{ UnorderedMap },    
};
use std::convert::TryInto;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

const ONE_NEAR:u128 = 1_000_000_000_000_000_000_000_000;
const MICRO_NEAR:u128 =   1_000_000_000_000_000_000_000;

const GAS_FOR_MINTING: Gas = 10_000_000_000_000;
const GAS_FOR_RESOLVE_OUTCOME: Gas = 10_000_000_000_000;
const NO_DEPOSIT: Balance = 0;
pub type TokenId = String;

/// Game rules

const PROB_LEGENDARY:u8 = 4;
const PROB_EPIC:u8 = 16; 
const PROB_RARE:u8 = 64;
const PROB_UNCOMMON:u8 = 128;

const CAP_LEGENDARY:u32 = 4*2;
const CAP_EPIC:u32 = 16*2;
const CAP_RARE:u32 = 64*2;
const CAP_UNCOMMON:u32 = 128*2;

#[near_bindgen]

#[derive(BorshDeserialize, BorshSerialize)]
pub struct LootboxGame {
    pub owner_id: AccountId,
    // All tokens minted durign the game
    pub minted_legendary: u32,
    pub minted_epic: u32,
    pub minted_rare: u32,
    pub minted_uncommon: u32,
    pub minted_common: u32,
    pub rewards: UnorderedMap<AccountId, Vec<u32>>, // Individual users rewards counter
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
            minted_legendary: 0,
            minted_epic: 0,
            minted_rare: 0,
            minted_uncommon: 0,
            minted_common: 0,
            rewards: UnorderedMap::new(b"rewards".to_vec()),
        }        
    }
    
    #[payable]
    pub fn play(&mut self) -> Promise {
        let account_id = env::signer_account_id();
        let deposit = env::attached_deposit();        
        
        assert!(deposit > (ONE_NEAR - MICRO_NEAR), "not enough currency to play");        
        
        // Toss the dice (minimal logic for now)
        let rand: u8 = *env::random_seed().get(0).unwrap();
        let mut token_id: TokenId = "COMMON".to_string();
        let metadata: String = "Congrats! METABUIDL Dino-NFT is yours!".to_string();

        // Decide what to mint for the player (default to common)
        if (rand < PROB_LEGENDARY) && (self.minted_legendary < CAP_LEGENDARY) {            
            token_id = "LEGENDARY".to_string();
        } else if (rand < PROB_EPIC) && (self.minted_epic < CAP_EPIC) {
            token_id = "EPIC".to_string();
        } else if (rand < PROB_RARE) && (self.minted_rare < CAP_RARE) {
            token_id = "RARE".to_string();
        } else if (rand < PROB_UNCOMMON) && (self.minted_uncommon < CAP_UNCOMMON) {
            token_id = "UNCOMMON".to_string();            
        }

        // Add time for token uniqness
        let timestamp: u64 = env::block_timestamp();
        let token_id_with_timestamp: String = format!("{}:{}", token_id.clone(), timestamp);

        // Transfer reward to the player
        // call NFT contract transfer call function
        ext_nft::nft_mint(
            account_id.clone(),
            token_id_with_timestamp.clone(),
            metadata.clone(), // lootbox contract is the owner            
            &"nft.vself.testnet",
            10 * MICRO_NEAR, // minting cost
            GAS_FOR_MINTING,
        ).then(ext_self::nft_resolve_outcome(            
            token_id,
            account_id,
            &env::current_account_id(),
            NO_DEPOSIT,
            GAS_FOR_RESOLVE_OUTCOME,
        )) 
    }

    /// self callback
    pub fn nft_resolve_outcome(
        &mut self,        
        token_id: TokenId,
        winner_id: AccountId,
    ) -> i32 {
        env::log(format!("Promise Result {:?}", env::promise_result(0)).as_bytes());        

        // value is nothing, checking if nft_transfer was Successful promise execution
        if let PromiseResult::Successful(_value) = env::promise_result(0) {            
            // Update rewards balance
            let mut balance = self.rewards.get(&winner_id).unwrap_or(vec![0,0,0,0,0]);                        
            let mut result: usize = 0;
            
            if token_id == "COMMON" {                 
                result = 0;
                self.minted_common = self.minted_common + 1;
            }
            if token_id == "UNCOMMON" { 
                result = 1;                
                self.minted_uncommon = self.minted_uncommon + 1;
            }
            if token_id == "RARE" { 
                result = 2;                
                self.minted_rare = self.minted_rare + 1;
            }
            if token_id == "EPIC" { 
                result = 3;                
                self.minted_epic = self.minted_epic + 1;
            }
            if token_id == "LEGENDARY" { 
                result = 4;
                self.minted_legendary = self.minted_legendary + 1;
            }

            balance[result] = balance[result] + 1;
            self.rewards.insert(&winner_id, &balance);
            return result.try_into().unwrap();
        }

        // no promise result        
        return -1;
    }

    /// Views

    // Get personal balance of a player
    pub fn get_balance(&self, account_id: AccountId) -> Vec<u32> {
        self.rewards.get(&account_id).unwrap_or(vec![0, 0, 0, 0, 0])
    }
    
    // Get total amount of NFTs minted so far
    pub fn get_nft_total_balance(&self) -> Vec<u32> {
        vec![
            self.minted_common,
            self.minted_uncommon,
            self.minted_rare,
            self.minted_epic,
            self.minted_legendary,
        ]
    }
}

/// External contract interface
#[ext_contract(ext_nft)]
trait NonFungibleToken {
    /// change methods    
    fn nft_mint(&mut self, receiver_id: AccountId, token_id: TokenId, metadata: String);

    // view method
    fn nft_token(&self, token_id: String) -> Option<Token>;
}

/// Callback pattern interface
#[ext_contract(ext_self)]
trait ResolvePurchase {
    fn nft_resolve_outcome(
        &mut self,        
        token_id: TokenId,
        winner_id: AccountId,
    ) -> Promise;
}



use borsh::{ BorshDeserialize, BorshSerialize };
use near_sdk::{
    env, near_bindgen, AccountId, Balance, PublicKey, Promise,
    collections::{ UnorderedMap },
    json_types::{ U128, Base58PublicKey },
};
use serde::Serialize;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

const ONE_NEAR:u128 = 1_000_000_000_000_000_000_000_000;
const PROB:u8 = 255; // 100%

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
    pub fn play(&mut self) -> u8 {
        let account_id = env::signer_account_id();
        let deposit = env::attached_deposit();
        
        assert!(deposit > ONE_NEAR - 1, "not enough currency to play");        
        
        // Toss the dice (minimal logic for now)
        let rand: u8 = *env::random_seed().get(0).unwrap();
        if rand < PROB {
            // Transfer reward to the player
            // TO DO NFT transfer from nft.vself.near

            // Update rewards balance
            let mut balance = self.rewards.get(&account_id).unwrap_or(0);
            balance = balance + 1;
            self.rewards.insert(&account_id, &balance);
        }
        
        rand
    }

    pub fn get_balance(&self, account_id: AccountId) -> U128 {
        self.rewards.get(&account_id).unwrap_or(0).into()
    }
}



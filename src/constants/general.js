// Dinosaurus images
import commonRarityImage from '../public/dinos/common.png';
import uncommonRarityImage from '../public/dinos/uncommon.png';
import rareImage from '../public/dinos/rare.png';
import epicRarityImage from '../public/dinos/epic.png';
import legendaryRarityImage from '../public/dinos/legendary.png';

// Mapping from rarity to image with dino
export const RARITY_IMAGES = {
  common: commonRarityImage,
  uncommon: uncommonRarityImage,
  rare: rareImage,
  epic: epicRarityImage,
  legendary: legendaryRarityImage,
};

// Cost of one game in NEAR
export const GAME_COST = '2';

// Limits for nfts amount from common to legendary
export const NFT_SUPPLIES = [-1, 128, 32, 16, 4];

// Text constants
export const FOOTER_TEXT = 'Footer text';
export const INSTRUCTIONS =
  'Welcome to the Loot Box game! \n Here, you have a chance to win one of our amazing Dino-NFTs. Give it a try for only 2 NEAR per round! Connect your NEAR wallet to collect it.';

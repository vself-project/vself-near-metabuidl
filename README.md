## Intro

This is the repo for vSelf team public activity and source code storage for the METAbuidl hackathon run by Near project. We are a team of developers with specific framework and language preferences so we are building demo based on our tech stack preferences:

1. Next.js / React for web frontend
2. Digital Ocean / Google Cloud for hosting dockerized services
3. Backend and contracts in Rust

We build a lottery game with a set of NFTs available as rewards for general audience. The project is delivered as a minimal viable web application with the corresponding NEAR-based backend + documentation and code on this GitHub. This document is high level design concept, for technical details on how to run and operate the demo please refer to a separate [DEVS Documentation](DEVS.md)

## Concept

Currently we came up with a simple concept of an on-chain lottery which distributes a certain amount of preminted NFTs. The other part of the effort is related to NEAR + Metamask integration as in [challenge presented](https://airtable.com/shrdNEynK25TGJ91h/tblTtriXzrEiCfpoy/viwGhGQTKiJ4L5JSG/recSnmCyJrMNKDUcz), so we are also trying to see if we can make this happen during hackathon.

### NEAR Contracts design

1. Lootbox reward distribution logic using source of verifiable randomness of NEAR blockchain
   /contracts/game - contains Rust contract with game logic, which provides a backend for web application. Rules of the game are:

   1. You pay fixed price to smartcontract to have a chance of winning Dino-NFTs.
   1. With certain probability you get a prize NFT ranging from epic to common
   1. NFT is minted through cross-contract call and sent to the player

   For development:

   ```bash
   yarn test:deploy
   ```

   For deployment to staging server:

   ```bash
   yarn build:contracts
   yarn deploy:lootbox
   ```

1. NFT contract for minting and management of NFTs during demo
   /contracts/nft-simple - contains minimalistic Rust contract compliant with NFT standart, and taken from nft-launcher example with capacity to facilitate new users onboarding in the future.

   For deployment details see contract related [docs](contracts/nft-simple/README.md)

### Future plans

1. Sponsored onboarding through guest accounts as in nft-launcher app
1. Integration with Metamask: Aurora network [relayer contract](https://github.com/aurora-is-near/aurora-relayer) + NEAR based [Eth proxy/gateway contracts](https://github.com/ilblackdragon/near-eth-gateway)

### User Journey

What we imagine as we develop our project further. This is description of user experience we want to deliver:

- User visits our web site and logs in with his NEAR account to participate in a game
- After successful login a person can see what prizes are left for the lottery
- Person then decides on how much she is willing to pay to participate in a game
- User sees probabilities of getting rewards based on the amount in a web app
- User pushes the play button and signs transaction (with NEAR account or Metamask)
- User sees his result of every transaction and already won rewards on the web page
- User gets Dino-NFT minted by nft.vself.testnet contract

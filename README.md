## Intro

This is the repo for vSelf team public activity and source code storage for the METAbuidl hackathon run by Near project. We are a team of developers with specific framework and language preferences so we are building demo based on our tech stack preferences:

1. Next.js / React for web frontend
2. Google Cloud Platform for hosting dockerized services
3. Backend and contracts in Rust

We build a lottery game with a set of NFTs available as rewards for general audience. The project is delivered as a minimal viable web application with the corresponding NEAR-based backend + documentation and code on this GitHub. This document is high level design concept, for technical details on how to run and operate the demo please refer to a separate [DEVS Documentation](DEVS.md)

## Concept

Currently we came up with a simple concept of an on-chain lottery which distributes a certain amount of preminted NFTs. The other part of the effort is related to Near / Metamask integration as in [challenge presented](https://airtable.com/shrdNEynK25TGJ91h/tblTtriXzrEiCfpoy/viwGhGQTKiJ4L5JSG/recSnmCyJrMNKDUcz), so we are also trying to see if we can make this happen during hackathon.

### NEAR Contracts design

1. Lootbox reward distribution logic using source of verifiable randomness of NEAR blockchain 
1. NFT contract for minting and management of NFTs during demo
1. Aurora network [relayer contract](https://github.com/aurora-is-near/aurora-relayer)
1. NEAR based [Eth proxy/gateway contracts](https://github.com/ilblackdragon/near-eth-gateway)

### User Journey

What we imagine as we develop our project further. This is description of user experience we want to deliver:

- User visits our web site and logs in with his NEAR account to participate in a game
- After successful login a person can see what prizes are left for the lottery
- Person then decides on how much she is willing to pay to participate in a game
- User sees probabilities of getting rewards based on the amount in a web app
- User pushes the play button and signs transaction (with NEAR account or Metamask)
- User sees his result of every transaction and already won rewards on the web page
 
 NFTs for rewards will be minted on testnet before demo begins, and probably they will be designed by our more artistic friends.

 # TO DO
 1. Next.js + NearSDK (for contract interaction)
 1. Lootbox contract, logic (RULES.md) + implement (lootbox.rs) = linear
 1. NFT contract (nft-vself-metabuidl.rs) + Mint items for rewards
 1. Lootbox / NFT contracts interaction for distribution
 1. Web app UI/UX
 - rules and intro
 - engagement history and rewards
 - wallet balance and login
 - play button (to sign transaction and play)
 1. Metamask integration (Optional)
# 🔌 ETH Basic Typescript Starter

DEPRECATED: This README documents the older version of this starter available [HERE](https://github.com/nezz0746/typescript-eth-starter/tree/12d7cd88a70251b134abea7ea7c0666aa2142de0)

This monorepo should allow you to get started with a simple Greeter smart contract on localhost and Rinkeby and the Polygon POS chain (L2 network), in record time with this basic react stack using

- Typescript
- NextJS
- 👷 [Hardhat](https://hardhat.org/)
- 🤝 [useDapp](https://usedapp.readthedocs.io/en/latest/)
- Tailwind CSS
- Redux Toolkits
- Yarn Workspace

Heavily influenced by Scaffold-Eth and the existing [Typescript branch](https://github.com/austintgriffith/scaffold-eth/tree/nextjs-typescript). Go 🏗 [check it out](https://github.com/austintgriffith/scaffold-eth) 🏗 if you haven't !

## Table of Content

- [🔌 ETH Basic Typescript Starter](#-eth-basic-typescript-starter)
  - [Table of Content](#table-of-content)
  - [Get Started](#get-started)
  - [Examples](#examples)
    - [1. Greeter Contract](#1-greeter-contract)
    - [2. NFT Sale Dashboard](#2-nft-sale-dashboard)
  - [Deploy your Smart Contracts on Rinkeby](#deploy-your-smart-contracts-on-rinkeby)
  - [Deploy your Dapp on IPFS](#deploy-your-dapp-on-ipfs)

## Get Started

Clone the project and install dependencies,

```
git clone https://github.com/nezz0746/typescript-eth-starter.git
cd typescript-eth-starter
yarn install
```

_Environement variables setup_

First create an Infura projetct and add your project id to the .env variable **INFURA_ID**.

This starter is setup to be usable/deployable on a local node and on Rinkeby. So before you start make sure you fill the **RINKEBY_PRIVATE_KEY** or **POLYGON_PRIVATE_KEY** variable. (Checkout [this section](#deploy-your-smart-contracts-on-rinkeby) for more info on the private key), or comment out the rinkeby section if you juste want to start working asap on localhost.

```js
// packages/hardhat/hardhat.config.ts
  ...
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
      accounts: [`0x${RINKEBY_PRIVATE_KEY}`]
    },
    matic: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`,
      accounts: [`0x${POLYGON_PRIVATE_KEY}`],
    },
  }
  ...
```

Then open 3 separate terminals and run

1. Start your local node

```
yarn chain
```

2. Deploy your Greeter contract to your local node with

```
yarn deploy
```

3. Then start your frontend !

```
yarn dev
```

Finnally, open <http://localhost:3000> to see the app.

You frontend should be live on localhost and ready to submit and new `setGreeting` transaction to the local chain !

Here is what it should look like when launched !

<img src="https://i.imgur.com/5X4l9Lg.png" style="border-radius: 4px;" />

## Examples

### 1. Greeter Contract

### 2. NFT Sale Dashboard

What you will find on this page is an interface which interacts with the ERC721 contract: MyNFT, found in `packages/hardhat/MyNFT.sol`. It contains two tabs which themselves contain actions typically done as 1. an **Owner** of a contract and 2. a **Client** of the contract.

<img src="https://i.imgur.com/9faye6G.png" style="border-radius: 4px;" />

For now two actions are availbale as Owner: The ability to list a new NFT, and pause the sale as the contract is pausable ([see the ERC721Pausable extension on OpenZepplin](https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#ERC721Pausable)). As a client you'll be able to see the mintable NFTs, mint one and see the NFTs you own.

<div style="display: flex; justify-content: center;">
  <img src="https://i.imgur.com/AROu7UD.png" width="800px" style="border-radius: 4px;" />
</div>

To improve the UX and understanding of ownership, Alerts and Warnings have been added. For example you'll be warned on the client side if you are minting as the owner or if the sale is paused. And you'll shown an warning as well if you're trying to trigger owner actions while not being the owner.

- Metadata

The crucial thing on the frontend part is to make sure you upload the correct metadata for your NFT. [OpenSea documentation](https://docs.opensea.io/docs/metadata-standards) is a good place to get a first look at standards. Here we upload the most basic metadatas possible with **name**, **description** and **image** (url)

```js
// Upload NFT Metadata to IPFS
const added = await client.add(
  JSON.stringify({
    name,
    description: "MyNFT",
    image: `https://ipfs.infura.io/ipfs/${imageIPFS.path}`,
  })
);

// Use the resulting URI for our tokenURI
const url = `https://ipfs.infura.io/ipfs/${added.path}`;
```

- Opensea

Once you listed a couple of NFT, you should find them on [OpenSea's Testnet App](https://testnets.opensea.io/) !

<div style="display: flex; justify-content: center;">
  <img src="https://i.imgur.com/2olNedM.png" width="800px" style="border-radius: 4px;" />
</div>

## Deploy your Smart Contracts on Rinkeby

To deploy your app on Rinkeby, you'll first need to populate two environment variables in your `.env` file, that are used in `packages/hardhat/hardhat.config.ts`. Checkout [Infura](https://infura.io/) it is a suite of tools that make it easy for developpers to deploy things on Ethereum and IPFS. Create a project there, go to _Settings_ and copy the **Project ID**.

For your private key make sure you use an account you do not have any real funds on and export the private key. As a good practive, never share any account's private key in your repository. `Metamask > (Select a dev account) > Account details > Export private key`

```
const INFURA_ID = process.env.INFURA_ID;
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY
```

Now after you deploy,

```
yarn deploy:rinbeky
```

your smart contracts should be live on Rinkeby !

## Deploy your Dapp on IPFS

IPFS uses **Content-Addressing** to reference content on the network, instead of location-based addressing as used in traditional web. Whenever you add content to IPFS, a cryptographic hash is produced to identify your content called a **CID**.

After running,

```
yarn ipfs
```

you will be given a hash which reprensent the root CID of the root directory of your website. Then all subdirectories and consequent files will have their own CID since every file on IPFS no matter it's type (folder, image, text, etc) has it's own CID. Using the [IPFS CLI](https://docs.ipfs.io/install/command-line/) you'll be able to visualize what has been hosted on IPFS with all your content by running

```
> ipfs ls [YOUR_SITE_ROOT_CID]

> QmTgXrRyvfb8su1YaaafBPYDqdjbSG82qMFyW5XPftdjv6 5884  404.html
QmUJUdDtY1hLt73buoaaaDm2rARRVpkYYDHa8BvnZq3TY3 -     _next/
Qme1DM3r38NsjAXYAoazamgrdpk1CffLiPc14ZHp5Dgya1 15086 favicon.ico
QmNufHi8Rgwx6K4854aaa8mSpHS5pXznHvMXrrU4yvk8HC -     images/
QmeUAy5yNYo67C8id7acWyrrUtm6aks4AQcoDhcveYXrKE 5130  index.html
Qmdd8btEki1ASFBjMeeeaDNyAAzXH1skok8csiPQWWrnaS 1101  vercel.svg
```

You could also use the [IPFS Desktop App](https://github.com/ipfs/ipfs-desktop) to see your content, it has a nice GUI and extra content to better understand how IPFS works. It'll also run a IPFS node for you locally so you can obtain content from other peers.

<div style="display: flex; justify-content: center;">
<img src="https://i.imgur.com/qYljPSy.png" width="400" />
<img src="https://i.imgur.com/A8Mb1rA.png" width="400" />
</div>

([This video](https://www.youtube.com/watch?v=hnigvVuoaIA&t=338s&ab_channel=OurNetworks) provides a great introdction to how IPFS works)

TODO

- [ ] Add Mainnet fork as dev chain
- [ ] Add ENS name converter

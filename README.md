# 🔌 ETH Basic Typescript Starter

This monorepo should allow you to get started with a simple Greeter smart contract on localhost and Rinkeby in record time with this basic react stack using

- Typescript
- NextJS
- 👷 [Hardhat](https://hardhat.org/)
- 🤝 [useDapp](https://usedapp.readthedocs.io/en/latest/)
- Tailwind CSS
- Redux Toolkit
- Yarn Workspace

Heavily influenced by Scaffold-Eth and the existing [Typescript branch](https://github.com/austintgriffith/scaffold-eth/tree/nextjs-typescript). Go 🏗 [check it out](https://github.com/austintgriffith/scaffold-eth) 🏗 if you haven't !

# Get Started

Clone the project and install dependencies,

```
git clone https://github.com/nezz0746/typescript-eth-starter.git
cd eth-starter
yarn install
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

<img src="snapshot.png" style="border: grey solid 1px; border-radius: 4px;" />

## Deploy on Rinkeby

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

# 🔌 ETH Basic Typescript Starter

### ✨ New version ✨

(Older version available [here](https://github.com/nezz0746/typescript-eth-starter/tree/12d7cd88a70251b134abea7ea7c0666aa2142de0))

This monorepo should allow you to get started with a simple Greeter smart contract on your local hardhat netowrk and Polygon testnet (Mumbai) in record time with this basic react stack using

- React / Typescript (Vite ⚡)
- 🏎️  [Turborepo](https://turborepo.org/)
- 👷 [Hardhat](https://hardhat.org/), with tests & plugings setup:
  - hardhat-deploy
  - hardhat-gas-reporter
- 🚀 [wagmi](https://wagmi.sh/), React Hooks library
- [Tailwind CSS](https://tailwindcss.com/)

## Get Started

Install dependencies

```
npm install
```

The repo consists of 2 apps **ethereum** (hardhat project) & your **web** app. Running

```
npm run dev
```

will concurrently:

- start your local chain
- compile contracts
- deploy contracts locally as described by the hardhat-deploy plugin
- start your web app on port 3000

While you work on your hardhat projet, any new compilation or deployments will be saved in the packages folder to
be consumed by your frontend or any other app you'll add in the future.

```
/apps
  /ethereum
  /web
  [...]
/packages
  /deployments
  /types
```

### Tests

Test your project with `npm run test`.

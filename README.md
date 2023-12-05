# 🔌 ETH Basic Typescript Starter

### ✨ New version (V3!) ✨

This monorepo should allow you to get started with a simple Counter smart contract on your local anvil instance, and a dapp

- React / Typescript (Vite ⚡)
- 🏎️  [Turborepo](https://turborepo.org/)
- ⚒️ [Foundry](https://github.com/foundry-rs/foundry), with tests & local anvil instance:
  - Multi chain deployments utils
  - Upgradeable Counter example
- Subgraph to index your smart contracts
- 🐋 Docker Compose file to run you anvil & graph-node locally quickly
- 🚀 [wagmi](https://wagmi.sh/) & 🌈 [RainbowKit](https://www.rainbowkit.com/) !
  - Generated custom hooks with the wagmi-cli !
- graphql-codegen generated hooks to query your subgraph from your apps quickly 
- [Tailwind CSS](https://tailwindcss.com/) with [DaisyUI](https://daisyui.com/) 🌼 ! 

Recommended:
- [Rivet](https://github.com/paradigmxyz/rivet): Developper wallet & devtool for you local developpement

## Get Started

### 0. Set environment variables (Optional)



### 1. Install dependencies

```
yarn
```

### 2. Start developement process
Will concurrently:

- launch your anvil instance
- start your react app dev server

```
yarn run dev
```

### 3. Deploy

```
yarn run deploy:local
```

Will:
- Run your deploy script on your local chain
- Regenerate your custom hooks stright into your wagmi-config


```bash
/apps
  # You foundry project
  /contracts
  # Your dapp
  /web
/packages
  # Contains wagmi & rainbowkit config and generated code with the wagmi-cli
  /wagmi-config
  # Hosting app constants
  /shared-config
```

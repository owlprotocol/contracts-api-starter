# Owl Protocol Contracts API TRPC Starter

Owl Protocol API Example using our TRPC client.

> This guide assumes you are integrating Owl API with an **existing app with your own user base**.

### Our Web3 API is a powerful tool to easily integrate blockchain into your app or platform.

#### Typescript TRPC Client SDK:

```ts
import { createClient } from "@owlprotocol/contracts-api-client-trpc";

(async () => {

  const projectId = await client.project.projectCreate.mutate({
      projectName: "MyWeb3App",
      description: ""
  });

  const {safeAddress, owlUserId: userId} = await client.user.getOrCreateByEmail.mutate({
      projectId,
      email
  });
})();
```
#### OR

#### REST API - TRPC with OpenAPI

*Docs coming soon...*

## Features

1. Generate unique, universal, multichain **Owl Smart Wallets** for any user using just their email. **These wallets are fully controlled by the email account owner.**

2. Deploy on-chain collections of unique digital cards or items for a variety of use cases, including:
   - **Art or Real-World Assets** - tie real world items to a unique on-chain item with metadata.
   - **Gaming or Avatars** - create on-chain ownable items of your in-game items or characters to give your users more control of their assets.
   - **Loyalty or Reward Cards** - track your user loyalty on Web3 with truly unique loyalty cards that open up a variety of ways to collaborating with other brands and apps.how'

3. Connect your back-end or database with your on-chain digital items, and synchronize data with our API or using our webhooks.


## Getting Started

Generally for integrating an existing app you would do the following:

1. Create an **Owl API Project** associated with your app.
2. Use our API to generate `Smart Wallets` for each of your users, and "store" the associated `OwlUserId`.
    > You will need the `OwlUserId` in subsequent calls to send them items or update data.
3. Deploy a `Digital Item Collection`


## Project Setup

### Node

If you do not have Node 18 installed, we recommend using [nvm](https://github.com/nvm-sh/nvm)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
nvm install 18
```

### PNPM

We recommend using [pnpm](https://pnpm.io/) as a package manager.

```bash
npm install --global pnpm
```

### Install Dependencies

```bash
git clone https://github.com/owlprotocol/contracts-api-starter.git && cd contracts-api-starter
pnpm install
```

## Get an API Key

-   Sign up on [dashboard.owlprotocol.xyz](https://dashboard.owlprotocol.xyz/)
-   Go to the Dashboard's Settings page to get your API key

Create a `.env` file similar to `.env.example`:

In this example we are using Linea `chainId`: 80001, another common one for testing is Polygon testnet (Mumbai): 80001

```bash
API_KEY="<YOUR_API_KEY>"
API_URL="http://contracts-api.owlprotocol.xyz/api/trpc"
NETWORK_ID=80001
```

## Recipes

These recipes are meant to showcase example use cases of the Owl Protocol API. Check out [docs-api.owlprotocol.xyz](https://docs-api.owlprotocol.xyz) to learn how to leverage our API.

### Safe Smart Wallet

You **MUST** run this recipe **FIRST** before any other recipe. A [Gnosis Safe](https://safe.global/) is required for **each wallet** to use [Account Abstraction](https://ethereum.org/en/roadmap/account-abstraction/) features (gas sponsorship, batch transactions).

This Recipe has the following steps:

1. Deploy a [Gnosis Safe](https://safe.global/) smart wallet

```bash
pnpm run recipes:deploy-safe
```

### ERC721 Owl Recipe

Run this recipe to deploy an ERC721 collection called `My Collection` with a `MY` ticker symbol.

This Recipe has the following steps:

1. Deploy an [ERC721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/) collection
2. Mint one NFT to `address(1)`

```bash
pnpm run recipes:deploy-erc721-owl-collection
```

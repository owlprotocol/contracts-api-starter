# Owl Protocol Contracts API TRPC Start

Owl Protocol API Example Recipes using our TRPC client.

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

-   Sign up on [dashboard.owlprotocol.xyz/](https://dashboard.owlprotocol.xyz/)
-   Go to [docs-api.owlprotocol.xyz/docs](https://docs-api.owlprotocol.xyz/docs), and sign up to get your API key

Create a `.env` file similar to `.env.example`:

```bash
API_KEY="<YOUR_API_KEY>"
API_URL="http://contracts-api.owlprotocol.xyz/api/trpc"
```

## Recipes

These recipes are meant to showcase example use cases of the Owl Protocol API. Check out [docs-api.owlprotocol.xyz](https://docs-api.owlprotocol.xyz) to learn how to leverage our API.

### Safe Smart Wallet

You **MUST** run this recipe **FIRST** before any other recipe. A [Gnosis Safe](https://safe.global/) is required for **each chain** to use [Account Abstraction](https://ethereum.org/en/roadmap/account-abstraction/) features (gas sponsorship, batch transactions).

This Recipe has the following steps:

1. Deploy a [Gnosis Safe](https://safe.global/) smart wallet

```bash
pnpm run recipes:deploy-safe
```

### ERC20

Run this recipe to deploy an ERC20 token called `My Token` with `MY` ticker symbol.

This Recipe has the following steps:

1. Deploy an [ERC20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token
2. Mint 100 tokens to `address(1)`.

```bash
pnpm run recipes:deploy-erc20
```

### ERC721

Run this recipe to deploy an ERC721 collection called `My Collection` with a `MY` ticker symbol.

This Recipe has the following steps:

1. Deploy an [ERC721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/) collection
2. Mint one NFT to `address(1)`

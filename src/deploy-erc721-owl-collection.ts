import { createClient } from "@owlprotocol/contracts-api-client-trpc";
import { readFileSync } from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// API_URL is optional
const { API_KEY, API_URL, NETWORK_ID } = process.env;
if (!API_KEY) throw new Error(`API_KEY ${API_KEY}! Get API_KEY by signing up and adding it to .env file`);

console.log(API_URL);
console.log(API_KEY);

// 0. Create TRPC Client (API_KEY required)
const client = createClient(API_KEY, API_URL);
const networkId = NETWORK_ID ?? "80001";
const account = "0x0000000000000000000000000000000000000001";

async function deployERC721OwlCollection(){

    const contract = await client.collection.deploy.mutate({
        networkId,
        name: "My Collection",
        symbol: "MY",
    });

    console.log(contract);

    const address = contract.contractAddress;

    await sleep(10000);

    const mint = await client.collection.erc721.mint.mutate({
        networkId,
        address,
        mints: [
            {
                to: account,
                metadata: {
                    name: "My new token",
                },
            },
        ],
    });

    console.log(mint);

    const { tokenId } = mint.tokens[0];
    const owner = await client.interfaces.IERC721.ownerOf.mutate({
        address,
        networkId,
        contractParams: {tokenId},
    });

    console.log(tokenId);
    console.log('owner', owner);
}

async function main() {
    await deployERC721OwlCollection();
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

main();

import { createClient } from "@owlprotocol/contracts-api-client-trpc";
import {readFileSync} from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// API_URL is optional
const { API_KEY, API_URL } = process.env;
if (!API_KEY) throw new Error(`API_KEY ${API_KEY}! Get API_KEY by signing up and adding it to .env file`);

console.log(API_URL);
console.log(API_KEY);

// 0. Create TRPC Client (API_KEY required)
const client = createClient(API_KEY, API_URL);
const networkId = "59140";
const account = "0x0000000000000000000000000000000000000001";

async function deployERC721OwlCollection(){

    const contract = await client.collection.deploy.mutate({
        networkId,
        name: "My Collection",
        symbol: "MY",
    });


    const address = contract.contractAddress;
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

    const {tokenId} = mint.tokens[0];
    const owner = await client.interfaces.IERC721.ownerOf.mutate({
        address,
        networkId,
        contractParams: {tokenId},
    });

    const filePath = "src/images/owl_beach-sticker.png";
    const imageFile = readFileSync(path.join(process.cwd(), filePath));
    const imageContent = imageFile.toString("base64");
    const imageSuffix = "png";

    const imageUrl = await client.collection.createCollectionTokenIdImage.mutate({
        address,
        networkId,
        tokenId,
        imageContent,
        imageSuffix,
    });

    console.log(owner, imageUrl);
}

async function main() {
    await deployERC721OwlCollection();
}

main();

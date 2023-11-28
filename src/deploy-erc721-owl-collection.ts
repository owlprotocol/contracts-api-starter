import { createClient } from "@owlprotocol/contracts-api-client-trpc";
import { readFileSync } from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// API_URL is optional
const { API_KEY, API_URL, NETWORK_ID } = process.env;
if (!API_KEY) throw new Error(`API_KEY ${API_KEY}! Get API_KEY by signing up and adding it to .env file`);

console.log(`API_URL=${API_URL}`);
console.log(`API_KEY=${API_KEY}`);

// 0. Create TRPC Client (API_KEY required)
const client = createClient(API_KEY, API_URL);
const networkId = NETWORK_ID ?? "80001";
const userAccount = "0xb3BEc97C92A4aEA1371A9184eeD7646CB64146D3";

async function deployERC721CoinEasy(){

    // 1. Deploy an Owl ERC721 Collection
    // https://docs-api.owlprotocol.xyz/reference/collection-deploy
    const contract = await client.collection.deploy.mutate({
        networkId,
        name: "Owl Protocol Example",
        symbol: "OWL1",
        txWait: 1,
    });

    console.log(contract);

    // 2. Mint a token
    // https://docs-api.owlprotocol.xyz/reference/collection-erc721autoid-mint
    const contractAddr = contract.contractAddress;
    const mint = await client.collection.erc721AutoId.mint.mutate({
        networkId,
        address: contractAddr,
        mints: [
            {
                to: userAccount,
                metadata: {
                    name: "Owl Protocol",
                    experiencePoints: 0
                },
            },
        ],
        txWait: 1,
    });

    console.log(mint);

    // 3. Get token owner
    // https://docs-api.owlprotocol.xyz/reference/interfaces-ierc721-ownerof
    const { tokenId } = mint.tokens[0];
    const owner = await client.interfaces.IERC721.ownerOf.mutate({
        address: contractAddr,
        networkId,
        contractParams: {tokenId},
    });

    console.log(`tokenId ${tokenId} owner is ${owner.result.owner}`);

    // 4. Upload Token Image
    // https://docs-api.owlprotocol.xyz/reference/collection-createcollectiontokenidimage
    const filePath = "./src/images/owl.png";
    const imageFile = readFileSync(filePath);
    const imageContent = imageFile.toString("base64");
    const imageSuffix = "png";

    const imageUrl = await client.collection.createCollectionTokenIdImage.mutate({
        address: contractAddr,
        networkId,
        tokenId,
        imageContent,
        imageSuffix,
    });

    console.log(imageUrl);

    // 5. Verify Token metadata
    // https://docs-api.owlprotocol.xyz/reference/collection-collectionmetadata-collectiontokenmetadata
    const tokenMetadata = await client.collection.collectionMetadata.collectionTokenMetadata.mutate({
        networkId,
        tokenId,
        address: contractAddr
    });

    return tokenMetadata;
}

async function main() {
    const result = await deployERC721CoinEasy();
    console.log(result);
}

main();

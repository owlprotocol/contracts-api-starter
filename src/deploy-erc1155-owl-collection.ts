import { createClient } from "@owlprotocol/contracts-api-client-trpc";
import dotenv from "dotenv";
import { readFileSync } from "fs";

async function deployERC1155OwlCollection() {
    // 0. Create TRPC Client (API_KEY required)
    dotenv.config();

    // API_URL is optional
    const { API_KEY, API_URL, NETWORK_ID, SALT } = process.env;
    if (!API_KEY)
        throw new Error(
            `API_KEY ${API_KEY}! Get API_KEY by signing up and adding it to .env file`
        );

    const client = createClient({ apiKey: API_KEY }, API_URL);
    const networkId = NETWORK_ID ?? "59140";

    let deployParams;
    if (SALT) {
        deployParams = { salt: SALT };
    }

    // 1. Deploy an Owl ERC1155 Collection
    const contract = await client.collection.deploy.mutate({
        networkId,
        name: "My Collection",
        symbol: "MY",
        txWait: 1,
        deployParams,
        type: "ERC1155" as any,
    });

    console.log({ contract });

    // 2. Create token metadata
    const address = contract.contractAddress;
    const tokenId = "1";
    await client.collection.collectionMetadata.collectionTokenMetadataPut.mutate(
        {
            address,
            networkId,
            tokenId,
            tokenMetadata: {
                name: "My new token",
            },
        }
    );

    // 3. Mint a token
    const account = "0x1234000000000000000000000000000000000001";
    const mint = await client.collection.erc1155.mint.mutate({
        networkId,
        address,
        mints: [
            {
                to: account,
                tokens: [{ tokenId, amount: "1" }],
            },
        ],
        txWait: 1,
    });

    console.log({ mint });

    // 3. Upload Token Image
    const filePath = "./src/images/owl.png";
    const imageFile = readFileSync(filePath);
    const imageContent = imageFile.toString("base64");
    const imageSuffix = "png";

    const imageUrl =
        await client.collection.createCollectionTokenIdImage.mutate({
            address,
            networkId,
            tokenId,
            imageContent,
            imageSuffix,
        });

    return { address, imageUrl };
}

async function main() {
    const result = await deployERC1155OwlCollection();
    console.log(result);
}

main();

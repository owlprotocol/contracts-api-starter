import { createClient } from "@owlprotocol/contracts-api-client-trpc";
import dotenv from "dotenv";

async function deployREOCollection() {
    // 0. Create TRPC Client (API_KEY required)
    dotenv.config();

    const { API_KEY, API_URL, NETWORK_ID } = process.env;
    if (!API_KEY)
        throw new Error(
            `API_KEY ${API_KEY}! Get API_KEY by signing up and adding it to .env file`
        );

    // Create client with API credentials
    const client = createClient({ apiKey: API_KEY }, API_URL);

    // 1. Create a project
    const { id: projectId } = await client.projects.createProject.mutate({
        name: "REC Project",
        description: "My REC Project",
    });

    // 1. Deploy an Owl ERC1155 Collection
    // Define network ID (replace with your choice)
    const networkId = NETWORK_ID ?? "80001";

    const contract = await client.collection.deploy.mutate({
        networkId,
        name: "My REO Collection",
        symbol: "REO",
        txWait: 1,
        type: "ERC1155" as any,
        projectId,
    });

    // `contract` now contains data about the deployed ERC-1155 collection
    console.log({ contract });

    // 3. Define asset metadata
    const address = contract.contractAddress;
    const tokenId = "1";

    const farmAMetadata = {
        name: "Farm A",
        description:
            "Farm A Renewable Energy Originations (REOs). One instance corresponds to 1 MWh of energy",
        attributes: [
            { trait_type: "location", value: "Dubai" },
            { trait_type: "fuelType", value: "wind" },
        ],
    };

    await client.collection.collectionMetadata.collectionTokenMetadataPut.mutate(
        {
            networkId,
            tokenId,
            address,
            tokenMetadata: farmAMetadata,
        }
    );

    // 4. Mint 10 Farm A REOs
    const { address: myAccount } = await client.safe.safeAddressMe.mutate();
    const { hash } = await client.collection.erc1155.mint.mutate({
        networkId,
        address,
        mints: [
            {
                to: myAccount,
                tokens: [{ tokenId, amount: "10" }],
            },
        ],
        txWait: 1,
    });

    return { address, hash };
}

async function main() {
    const result = await deployREOCollection();
    console.log(result);
}

main();

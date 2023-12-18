import { createClient } from "@owlprotocol/contracts-api-client-trpc";
import dotenv from "dotenv";

async function deployLoyaltyProgram() {
    // 0. Create TRPC Client (API_KEY required)
    dotenv.config();

    // API_URL is optional
    const { API_KEY, API_URL, NETWORK_ID } = process.env;
    if (!API_KEY)
        throw new Error(
            `API_KEY ${API_KEY}! Get API_KEY by signing up and adding it to .env file`
        );

    // Create client with API credentials
    const client = createClient({ apiKey: API_KEY }, API_URL);
    const networkId = NETWORK_ID ?? "80001";

    // 1. Deploy an Owl Loyalty Program
    const loyaltyProgram = await client.loyalty.deploy.mutate({
        networkId,
        name: "My Loyalty Program",
        symbol: "MY",
        txWait: 1,
    });

    console.log({ loyaltyProgram });

    // 2. Update default tier
    const loyaltyProgramId = loyaltyProgram.loyaltyProgramId;

    await client.loyalty.tiers.update.mutate({
        loyaltyProgramId,
        tierId: "defaultTier",
        metadata: {
            name: "Bronze Tier",
            description: "This is Bronze Tier",
            attributes: [{ trait_type: "Tier", value: "Bronze" }],
        },
    });

    // 3. Create a Silver tier
    await client.loyalty.tiers.create.mutate({
        loyaltyProgramId,
        tierId: "silver",
        metadata: {
            name: "Silver Tier",
            description: "This is Silver Tier",
            attributes: [{ trait_type: "Tier", value: "Silver" }],
        },
        pointsThreshold: 5,
    });

    // 4. Mint a loyalty card
    const account = "0x1234000000000000000000000000000000000001";
    const address = loyaltyProgram.contractAddress;

    const mint = await client.loyalty.mint.mutate({
        loyaltyProgramId,
        addresses: [account],
        txWait: 1,
    });

    console.log({ mint });

    // 5. Get loyalty card (token) owner
    const { tokenId } = mint.mints[0];
    const owner = await client.interfaces.IERC721.ownerOf.mutate({
        address,
        networkId,
        contractParams: { tokenId },
    });

    console.log({ owner });

    // 6. Get loyalty card metadata
    const initialMetadata = await client.loyalty.metadataToken.query({
        loyaltyProgramId,
        tokenId,
    });

    console.log({ initialMetadata });

    // 7. Add points to loyalty card
    const { points } = await client.loyalty.points.add.mutate({
        loyaltyProgramId,
        tokenId,
        points: 5,
    });

    console.log({ points });

    // 8. Get updated loyalty card metadata, with new tier
    const updatedMetadata = await client.loyalty.metadataToken.query({
        loyaltyProgramId,
        tokenId,
    });

    return {
        updatedMetadata,
    };
}

async function main() {
    const result = await deployLoyaltyProgram();
    console.log(result);
}

main();

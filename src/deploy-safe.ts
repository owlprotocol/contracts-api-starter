import { createClient } from "@owlprotocol/contracts-api-client-trpc";
import dotenv from "dotenv";

/**
 * @dev Meant to be used for local testing. This mocks the traditional signup flow, creating a user & MPC Wallet
 * @returns
 */
export async function deploySafeRecipe() {
    dotenv.config();

    // API_URL is optional
    const { API_KEY, API_URL, NETWORK_ID } = process.env;
    if (!API_KEY) throw new Error(`API_KEY ${API_KEY}! Get API_KEY by signing up and adding it to .env file`);

    //0. Create TRPC Client (API_KEY required)
    const client = createClient(API_KEY, API_URL);

    //1. Create Safe Multisig for user
    const networkId = NETWORK_ID ?? "80001";
    console.log(`Connecting to Chain ID: ${networkId}`);
    const safe = await client.safe.deploy.mutate({ networkId });

    return safe;
}

async function main() {
    const safe = await deploySafeRecipe();
    console.debug(safe);
}

main();

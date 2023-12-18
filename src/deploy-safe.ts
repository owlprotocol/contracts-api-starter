import { createClient } from "@owlprotocol/contracts-api-client-trpc";
import dotenv from "dotenv";

export async function deploySafeRecipe() {
    dotenv.config();

    // API_URL is optional
    const { API_KEY, API_URL, NETWORK_ID } = process.env;
    if (!API_KEY)
        throw new Error(
            `API_KEY ${API_KEY}! Get API_KEY by signing up and adding it to .env file`
        );

    // 0. Create TRPC Client (API_KEY required)
    const client = createClient({ apiKey: API_KEY }, API_URL);

    //1. Create Safe Multisig for user
    const networkId = NETWORK_ID ?? "80001";

    const safe = await client.safe.deploy.mutate({ networkId });

    return safe;
}

async function main() {
    const safe = await deploySafeRecipe();
    console.log(safe);
}

main();

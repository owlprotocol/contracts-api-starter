import { createClient } from "@owlprotocol/contracts-api-client-trpc";
import dotenv from "dotenv";

export async function deployERC20() {
    // 0. Create TRPC Client (API_KEY required)
    dotenv.config();

    // API_URL is optional
    const { API_KEY, API_URL, NETWORK_ID } = process.env;
    if (!API_KEY)
        throw new Error(
            `API_KEY ${API_KEY}! Get API_KEY by signing up and adding it to .env file`
        );

    const client = createClient({ apiKey: API_KEY }, API_URL);

    // 1. Deploy ERC20Mintable contract
    const networkId = NETWORK_ID ?? "59140";
    const contract = await client.deploy.ERC20Mintable.mutate({
        networkId,
        contractParams: {
            name: "My Token",
            symbol: "MY",
        },
    });

    console.log({ contract });

    // 2. Mint token
    const address = contract.contractAddress;
    const account = "0x0000000000000000000000000000000000000001";
    const mint = await client.interfaces.IERC20Mintable.mint.mutate({
        networkId,
        address,
        contractParams: {
            to: account,
            amount: "100",
        },
    });

    console.log({ mint });

    const balance = await client.interfaces.IERC20.balanceOf.mutate({
        address,
        networkId,
        contractParams: { account },
    });

    return { balance };
}

async function main() {
    const result = await deployERC20();
    console.debug(result);
}

main();

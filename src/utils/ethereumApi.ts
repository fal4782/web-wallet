const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY;

const ALCHEMY_URL = `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`;

export async function fetchEthBalance(address: string): Promise<string> {
  const response = await fetch(ALCHEMY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getBalance",
      params: [address, "latest"],
    }),
  });

  const data = await response.json();
  const balanceInWei = BigInt(data.result); // use BigInt as the value might be too large for a number type
  const balanceInEth = Number(balanceInWei) / 1e18; // convert wei to eth
  return balanceInEth.toFixed(4); // round to 4 decimal places
}

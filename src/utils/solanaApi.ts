const alchemyApiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
const ALCHEMY_URL = `https://solana-devnet.g.alchemy.com/v2/${alchemyApiKey}`;

export async function fetchSolanaBalance(address: string): Promise<string> {
  const response = await fetch(ALCHEMY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [address],
    }),
  });

  const data = await response.json();
  return (data.result.value / 1e9).toFixed(4); // Convert lamports to SOL and round to 4 decimal places
}

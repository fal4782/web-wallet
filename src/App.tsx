import { useState } from "react";
import { generateMnemonic } from "bip39";
import { EthWallet } from "./components/ETHWallet";
import { SolanaWallet } from "./components/SolanaWallet";

const App = () => {
  const [mnemonic, setMnemonic] = useState("");

  const handleGenerateMnemonic = async () => {
    const mn = await generateMnemonic();
    setMnemonic(mn);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex flex-col items-center p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">
        Crypto Wallet Dashboard
      </h1>

      <button
        onClick={handleGenerateMnemonic}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Create Seed Phrase
      </button>

      {mnemonic && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">Seed Phrase</h2>
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
              {mnemonic.split(" ").map((word, index) => (
                <span
                  key={index}
                  className="bg-gray-700 px-2 py-1 sm:px-3 sm:py-2 rounded-md text-sm font-medium"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {mnemonic && (
        <div className="mt-12 w-full max-w-2xl space-y-8">
          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Ethereum Wallet</h2>
            <EthWallet mnemonic={mnemonic} />
          </div>

          <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Solana Wallet</h2>
            <SolanaWallet mnemonic={mnemonic} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

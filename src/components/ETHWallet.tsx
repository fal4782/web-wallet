import { useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { fetchEthBalance } from "../utils/ethereumApi";

export const EthWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [balances, setBalances] = useState<string[]>([]);

  useEffect(() => {
    const updateBalances = async () => {
      const newBalances = await Promise.all(addresses.map(fetchEthBalance));
      setBalances(newBalances);
    };

    updateBalances();
  }, [addresses]);

  const handleAddWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const wallet = new Wallet(child.privateKey);

    setCurrentIndex(currentIndex + 1);
    setAddresses([...addresses, wallet.address]);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleAddWallet}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow transition duration-300 ease-in-out"
      >
        Add ETH Wallet
      </button>

      <div className="space-y-3">
        {addresses.map((address, index) => (
          <div
            key={index}
            className="bg-gray-700 p-4 rounded-md shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <span className="font-medium break-all">{address}</span>
            <span className="text-green-400 mt-2 sm:mt-0">
              {balances[index] !== undefined
                ? `${balances[index]} ETH`
                : "Loading..."}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

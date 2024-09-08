import { useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import { fetchSolanaBalance } from "../utils/solanaApi";

export function SolanaWallet({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);
  const [balances, setBalances] = useState<string[]>([]);

  useEffect(() => {
    const updateBalances = async () => {
      const newBalances = await Promise.all(
        publicKeys.map((pk) => fetchSolanaBalance(pk.toBase58()))
      );
      setBalances(newBalances);
    };

    updateBalances();
  }, [publicKeys]);

  const handleAddWallet = async () => {
    console.log("handleAddWallet called");

    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    console.log(keypair.publicKey.toBase58());
    console.log(keypair.secretKey);

    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keypair.publicKey]);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleAddWallet}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md shadow transition duration-300 ease-in-out"
      >
        Add Solana Wallet
      </button>

      <div className="space-y-3">
        {publicKeys.map((p, index) => (
          <div
            key={index}
            className="bg-gray-700 p-4 rounded-md shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <span className="font-medium break-all">{p.toBase58()}</span>
            <span className="text-green-400 mt-2 sm:mt-0">
              {balances[index] !== undefined
                ? `${balances[index]} SOL`
                : "Loading..."}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

import { generateMnemonic, mnemonicToSeedSync } from "bip39"
import React from "react"
import { Wallet } from "./components/wallet"
import { Button } from "./components/ui/button"
import base58 from "bs58"
import nacl from "tweetnacl"
import { derivePath } from "ed25519-hd-key"

function keyGen(path: string, seed: Buffer) {
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);

  return {
    publicKey: base58.encode(keypair.publicKey),
    privateKey: base58.encode(keypair.secretKey)
  };
}

function App() {

  const mneumonics = React.useMemo(() => generateMnemonic(), []);

  const [count, setCount] = React.useState(0);
  const [wallet, setWallet] = React.useState<{ publicKey: string, privateKey: string }[]>([]);

  React.useEffect(() => {
    const path = `m/44'/501'/${count}'/0'`
    const seed = mnemonicToSeedSync(mneumonics)
    const keypair = keyGen(path, seed)
    setWallet([...wallet, keypair])
  }, [count])

  return (
    <div>
      <div className="grid grid-cols-3">
        {mneumonics.split(" ").map(elm => (
          <div>{elm}</div>
        ))}
      </div>
      <Button onClick={() => {
        setCount(count + 1)
      }
      }>Generate Wallet</Button>
      <ol className="p-6 m-auto">
        {wallet.map(keypair => (
          <Wallet keypair={keypair} />
        ))}
      </ol>
    </div>
  )
}

export default App

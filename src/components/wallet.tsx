export function Wallet({ keypair }: { keypair: { publicKey: string, privateKey: string } }) {

  return (
    <li>
      Address: {keypair.publicKey}
      <br />
      Secret: {keypair.privateKey}
    </li>
  )
}

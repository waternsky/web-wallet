//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'

import { generateMnemonic } from "bip39"

function App() {

  const mneumonics = generateMnemonic().split(" ");

  return (
    <div className="m-1 p-6 grid grid-cols-3 border w-1/3">
      {mneumonics.map(elm => (
        <div className="p-6 border text-center">{elm}</div>
      ))}
    </div>
  )
}

export default App

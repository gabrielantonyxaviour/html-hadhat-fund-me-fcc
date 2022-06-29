import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
connectButton.onclick = connect
fundButton.onclick = fund
async function connect() {
  if (typeof window.ethereum != undefined) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" })
      connectButton.innerHTML = "Connected!!!"
    } catch (error) {
      console.log(error.toString())
    }
  } else {
    connectButton.innerHTML = "Please install metamask"
  }
}

async function fund() {
  const ethAmount = "0.1"
  console.log(`Funding with ${ethAmount}`)
  if (typeof window.ethereum != undefined) {
    //provider
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    //wallet
    const signer = provider.getSigner()
    console.log(signer)
    //contract,abi
    const contract = new ethers.Contract(contractAddress, abi, signer)
    console.log(contract)
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      })
    } catch (error) {
      console.log(error)
    }
  }
}

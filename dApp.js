
    var getMood
    var setMood

type="module"
        import {
    createWalletClient,
    custom,
    getContract,
  } from "https://esm.sh/viem";
  import { sepolia } from "https://esm.sh/viem/chains";
    //creates a client that connects the user's account to Ethereum Sepolia
const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum),
  });

//show a pop-up requesting to connect wallet
//accounts will be an array
const accounts = await walletClient.requestAddresses();

//gets first address in the accounts array
const [address] = accounts;
const MoodContractAddress = "0x34A00b87c502537643aF8b95478690651bCC7B3b";
const MoodContractABI = [{
    "inputs": [],
    "name": "getMood",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [{
        "internalType": "string",
        "name": "_mood",
        "type": "string"
    }],
    "name": "setMood",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}
]
  //creates an instance of the contract for frontend interaction
  const MoodContractInstance = getContract({
    address: MoodContractAddress,
    abi: MoodContractABI,
    client: walletClient,
  });

// read function so no wallet pop up
  getMood= async function() {
              const mood = await MoodContractInstance.read.getMood();
              document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
            }
// write function so wallet pop up and tx confirmation requiring gas fees 
    setMood= async function() {
              const mood = document.getElementById("mood").value;
              await MoodContractInstance.write.setMood([mood],{
                account:address
              });
            }

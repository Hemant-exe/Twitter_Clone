import './App.css';
import {useState,useEffect} from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";



function App() {

    const [currentAccount, setCurrentAccount]=useState('');
    const [correctNetwork, setCorrectNetwork]= useState(false);

    const connectWallet = async() =>{
      try {
        const {ethereum}=window 

        if(!ethereum){
          console.log("MetaMask not connected");
          return;
        }

        let chainId=await ethereum.request({method : 'eth_chainId'})
        console.log('Connected to chain: ' + chainId );

        const sepoliaChainId="0xaa36a7";
        if(chainId !== sepoliaChainId){
          alert('You are not connected to the Sepolia Testnet!')
          return;
        }
        // else{
        //   setCorrectNetwork(true);
        // }

        const account=await ethereum.request({method: 'eth_requestAccounts'})
        console.log('Connected account: ', account[0]);
        setCurrentAccount(account[0]);
      }
      catch(error){
        console.log("Error Connecting Metamask",error);
      } 
    }
    // Checks if wallet is connected to the correct network
    const checkCorrectNetwork = async () => {
      const { ethereum } = window
      let chainId = await ethereum.request({ method: 'eth_chainId' })
      console.log('Connected to chain:' + chainId)
  
      const sepoliaChainId="0xaa36a7";
  
      if (chainId !== sepoliaChainId) {
        setCorrectNetwork(false)
      } else {
        setCorrectNetwork(true)
      }
    }

      useEffect(() => {
        connectWallet();
        checkCorrectNetwork();
      });


      return (
        // BEM
        <div>
        {currentAccount === '' ? (
          <button
          className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
          onClick={connectWallet}
          >
          Connect Wallet
          </button>
          ) : correctNetwork ? (
            <div className="app">
              <Sidebar />
              <Feed />
              <Widgets />
            </div>
          ) : (
          <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
          <div>----------------------------------------</div>
          <div>Please connect to the Sepolia Testnet</div>
          <div>and reload the page</div>
          <div>----------------------------------------</div>
          </div>
        )}
        </div>
    
      );
    }
    
    export default App;
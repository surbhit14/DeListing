// constants
import Web3 from "web3";
import ServiceNFTToken from "../../contract/NFT.json";
// log
import { fetchData } from "../data/dataActions";


const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  
  return async (dispatch) => {
    dispatch(connectRequest());
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const serviceNFTToken = new web3.eth.Contract(
          ServiceNFTToken,
          "0x6F18A79688ae36AcDEaE9179B0F14C114B467e07"
          // "0xE3493e9E5bFC9636056112A903c70bbADa7d374F" 
          // "0x126d0098A61Bd34eD44fe328E418D3CE543632F2"
        );
        console.log(accounts);
        console.log(serviceNFTToken);
        dispatch(
          connectSuccess({
            account: accounts[0],
            serviceNFTToken: serviceNFTToken,
            web3: web3,
          })
        );
        
        // Add listeners start
        window.ethereum.on("accountsChanged", (accounts) => {
          dispatch(updateAccount(accounts[0]));
        });
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};

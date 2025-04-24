import {
  getWalletAddress,
  initWalletClient,
} from "../../components/walletConnect";
import { shortenAddress } from "../../helpers/converters";

initWalletClient();

// Create Wallet button
const createWalletButton = async () => {
  const button = document.getElementById("wallet-connect-btn");
  let address;

  try {
    address = await getWalletAddress();
    button.innerText = shortenAddress(address);
  } catch (error) {
    console.log(error);
  }

  button.onclick = async () => {
    address = await getWalletAddress();
    button.innerText = shortenAddress(address);
  };
};
createWalletButton();

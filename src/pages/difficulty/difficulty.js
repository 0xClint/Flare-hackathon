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

const params = new URLSearchParams(window.location.search);

const mapId = params.get("map"); // "map"

console.log(mapId);
document
  .getElementById("difficulty-container")
  .addEventListener("click", (e) => {
    const button = e.target.closest(".btn"); // fix: use class selector
    console.log(button.id);
    if (button && button.id) {
      const difficulty = button.id;
      window.location.href = `game.html?difficulty=${difficulty}&map=${mapId}`;
    }
  });

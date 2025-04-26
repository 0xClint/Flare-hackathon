import {
  getWalletAddress,
  initWalletClient,
} from "../../components/walletConnect";
import {
  SRN_CONTRACT_ABI,
  SRN_CONTRACT_ADDRESS,
} from "../../contracts/constant";
import { reduceBigNumber, shortenAddress } from "../../helpers/converters";
import { publicClient } from "../../ViemClient";

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

document.getElementById("open-map").addEventListener("click", () => {
  const carousal = document.getElementById("map-carousal");
  carousal.style.display = "flex";
});

document.getElementById("back-btn").addEventListener("click", () => {
  const carousal = document.getElementById("map-carousal");
  carousal.style.display = "none";
});

document.getElementById("slide-wrapper").addEventListener("click", (e) => {
  const slide = e.target.closest(".swiper-slide");
  if (slide && slide.id) {
    const mapId = slide.id;
    window.location.href = `difficulty.html?map=${mapId}`;
    // window.location.href = `game.html?map=${mapId}`;
  }
});

//Get Number
// const getRandomNumber = async () => {
//   const data = await publicClient.readContract({
//     address: SRN_CONTRACT_ADDRESS,
//     abi: SRN_CONTRACT_ABI,
//     functionName: "getSecureRandomNumber",
//   });
//   console.log(data);
//   console.log("[RANDOM NUMBER]: " + reduceBigNumber(data[0].toString()));
// };

// getRandomNumber();

document.getElementById("setting-btn").addEventListener("click", () => {
  document.querySelector(".modal-container").style.display = "flex";
});

document.getElementById("cancel-icon").addEventListener("click", () => {
  document.querySelector(".modal-container").style.display = "none";
});

import {
  getWalletAddress,
  initWalletClient,
} from "../../components/walletConnect";
import {
  PRICE_FEED_CONTRACT_ABI,
  PRICE_FEED_CONTRACT_ADDRESS,
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

const priceFeedArr = [
  { id: 1, title: "FLR/USD" },
  { id: 2, title: "BTC/USD" },
  { id: 3, title: "ETH/USD" },
];

const getPriceFeed = async () => {
  let data = await publicClient.readContract({
    address: PRICE_FEED_CONTRACT_ADDRESS,
    abi: PRICE_FEED_CONTRACT_ABI,
    functionName: "getFtsoV2CurrentFeedValues",
  });

  let priceFeedData = priceFeedArr;
  for (let i = 0; i < data[0].length; i++) {
    priceFeedData[i].price = Number(data[0][i]) / Math.pow(10, data[1][i]);
  }

  const priceFLR = document.getElementById("price-feed-flr");
  priceFLR.innerHTML = `<b>${priceFeedData[0].price} ${priceFeedData[0].title}</b>`;
  const priceBTC = document.getElementById("price-feed-btc");
  priceBTC.innerHTML = `<b>${priceFeedData[1].price} ${priceFeedData[1].title}</b>`;
  const priceETH = document.getElementById("price-feed-eth");
  priceETH.innerHTML = `<b>${priceFeedData[2].price} ${priceFeedData[2].title}</b>`;

  console.log(priceFeedData);
};
getPriceFeed();

let priceflag = false;
document.getElementById("price-feed-btn").addEventListener("click", () => {
  if (!priceflag) {
    document.getElementById("price-feed-btn").style.transform =
      "translateX(210px) rotate(180deg)";
    document.getElementById("price-feed-eth").style.display = "block";
    document.getElementById("price-feed-btc").style.display = "block";
  } else {
    document.getElementById("price-feed-btn").style.transform =
      "translateX(210px) rotate(0deg)";
    document.getElementById("price-feed-btc").style.display = "none";
    document.getElementById("price-feed-eth").style.display = "none";
  }
  priceflag = !priceflag;
});

document.getElementById("setting-btn").addEventListener("click", () => {
  document.querySelector(".modal-container").style.display = "flex";
});

document.getElementById("cancel-icon").addEventListener("click", () => {
  document.querySelector(".modal-container").style.display = "none";
});

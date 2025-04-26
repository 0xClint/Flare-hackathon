import * as ex from "excalibur";
import {
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
  SCALE,
  EVENT_SEND_PLAYER_UPDATE,
  TAG_ANY_PLAYER,
  EVENT_SEND_MONSTER_UPDATE,
} from "../../constants.js";
import { Player } from "../../actors/Players/Player.js";
import { loader } from "../../resources.js";
import { Map_Indoor } from "../../maps/Map_Indoor.js";
import { Player_CameraStrategy } from "../../classes/Player_CameraStrategy.js";

import { NetworkActorsMap } from "../../classes/NetworkActorsMap.js";
import { Monster } from "../../actors/Monster/Monster.js";
import {
  getWalletAddress,
  initWalletClient,
} from "../../components/walletConnect.js";
import { Box } from "../../actors/Box.js";
import { BoxSequence } from "../../maps/BoxSequence.js";
import { publicClient } from "../../ViemClient.js";
import {
  SRN_CONTRACT_ABI,
  SRN_CONTRACT_ADDRESS,
} from "../../contracts/constant.js";
import {
  applyMod,
  getRandomInteger,
  reduceBigNumber,
} from "../../helpers/converters.js";
import { hudsData } from "../../datasets/hudsData.js";

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
const mapId = params.get("map");
const difficulty = params.get("difficulty");

const monsterSpwanCap = {
  easy: 4,
  medium: 8,
  hard: 12,
};

let monstersKilledCap = monsterSpwanCap[difficulty];
let monsterKilledCount = 0;
let rdnArray = [];

const onMonsterKilled = () => {
  monsterKilledCount++;

  if (monsterKilledCount >= monstersKilledCap) {
    setTimeout(() => {
      document.querySelector(".modal-container").style.display = "flex";
    }, 800);
    return;
  }
  document.getElementById("monster-kill-count").textContent =
    monsterKilledCount;
};

const game = new ex.Engine({
  width: VIEWPORT_WIDTH * SCALE,
  height: VIEWPORT_HEIGHT * SCALE,
  fixedUpdateFps: 60,
  antialiasing: false, // Pixel art graphics
});

game.on("initialize", async () => {
  //Map
  const map = new Map_Indoor(mapId);
  game.add(map);

  //Player
  const player = new Player(200, 200, "RED");
  game.add(player);

  //Boxes
  const data = await publicClient.readContract({
    address: SRN_CONTRACT_ADDRESS,
    abi: SRN_CONTRACT_ABI,
    functionName: "getSecureRandomNumber",
  });
  rdnArray = reduceBigNumber(data[0].toString());
  console.log("[RANDOM NUMBER]: " + rdnArray);

  const rdn = applyMod(
    BigInt(rdnArray[getRandomInteger(hudsData.length)]),
    hudsData.length
  );
  console.log(rdn);
  const box = new BoxSequence(rdn, mapId);
  game.add(box);

  const cameraStrategy = new Player_CameraStrategy(player, map);
  game.currentScene.camera.addStrategy(cameraStrategy);

  game.currentScene.world.queryManager.createQuery([TAG_ANY_PLAYER]);

  new NetworkActorsMap(game);

  // const spawnLimit = 10; // ← you can set this number dynamically if needed
  let spawnCount = 0;
  const spawnInterval = setInterval(() => {
    if (spawnCount >= monstersKilledCap) {
      clearInterval(spawnInterval);
      return;
    }
    const monster = new Monster(1, 19, onMonsterKilled);
    game.add(monster);
    spawnCount++;
  }, 3000);

  game.on(EVENT_SEND_PLAYER_UPDATE, (update) => {
    // console.log(update);
  });
  game.on(EVENT_SEND_MONSTER_UPDATE, (update) => {});
});
game.start(loader);

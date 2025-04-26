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

const params = new URLSearchParams(window.location.search);
const mapId = params.get("map");
const difficulty = params.get("difficulty");

let monstersKilledCap = 3;
let rdnArray = [];

let monsterKillCount = 0;
const onMonsterKilled = () => {
  monsterKillCount++;
  if (monsterKillCount == monstersKilledCap) {
  }
  document.getElementById("monster-kill-count").textContent = monsterKillCount;
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
  //  0701631633484
  const box = new BoxSequence(rdn, mapId);
  game.add(box);

  const cameraStrategy = new Player_CameraStrategy(player, map);
  game.currentScene.camera.addStrategy(cameraStrategy);

  game.currentScene.world.queryManager.createQuery([TAG_ANY_PLAYER]);

  new NetworkActorsMap(game);

  game.on(EVENT_SEND_PLAYER_UPDATE, (update) => {
    // console.log(update);
  });
  game.on(EVENT_SEND_MONSTER_UPDATE, (update) => {});
});
game.start(loader);

// Create Monster button
const createAddMonsterButton = () => {
  const button = document.createElement("button");
  button.onclick = () => {
    let spawnCount = 0;
    const interval = setInterval(() => {
      if (spawnCount >= 3) {
        clearInterval(interval);
        return;
      }
      const monster = new Monster(1, 19, onMonsterKilled);
      game.add(monster);
      spawnCount++;
    }, 3000); // every 3 seconds
  };

  button.style.display = "block";
  button.innerText = "ADD MONSTER";
  document.body.append(button);
};

createAddMonsterButton();

// Create Wallet button
const createWalletButton = () => {
  const button = document.createElement("button");
  button.onclick = () => {
    getWalletAddress();
  };
  button.style.display = "block";
  button.innerText = "CONNECT WALLET";

  document.body.append(button);
};
createWalletButton();

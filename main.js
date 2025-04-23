import * as ex from "excalibur";
import {
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
  SCALE,
  EVENT_SEND_PLAYER_UPDATE,
  TAG_ANY_PLAYER,
  EVENT_SEND_MONSTER_UPDATE,
} from "./src/constants.js";
import { Player } from "./src/actors/Players/Player.js";
import { loader } from "./src/resources.js";
import { Map_Indoor } from "./src/maps/Map_Indoor.js";
import { Player_CameraStrategy } from "./src/classes/Player_CameraStrategy.js";

import { NetworkActorsMap } from "./src/classes/NetworkActorsMap.js";
import { Monster } from "./src/actors/Monster/Monster.js";
import {
  getWalletAddress,
  initWalletClient,
} from "./src/components/walletConnect.js";
import { Box } from "./src/actors/Box.js";
import { BoxSequence } from "./src/maps/BoxSequence.js";

let monsterKillCount = 0;
const onMonsterKilled = () => {
  monsterKillCount++;
  document.getElementById("monster-kill-count").textContent = monsterKillCount;
};

const game = new ex.Engine({
  width: VIEWPORT_WIDTH * SCALE,
  height: VIEWPORT_HEIGHT * SCALE,
  fixedUpdateFps: 60,
  antialiasing: false, // Pixel art graphics
});

const map = new Map_Indoor();
game.add(map);

const box = new BoxSequence();
game.add(box);

const player = new Player(200, 200, "RED");
game.add(player);

game.on("initialize", () => {
  // Add custom Camera behavior, following player and being limited to the map bounds
  const cameraStrategy = new Player_CameraStrategy(player, map);
  game.currentScene.camera.addStrategy(cameraStrategy);

  // Set up ability to query for certain actors on the fly
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

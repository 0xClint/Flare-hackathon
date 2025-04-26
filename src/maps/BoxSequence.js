import * as ex from "excalibur";
import { ANCHOR_TOP_LEFT, SCALE_2x } from "../constants.js";
import { Box } from "../actors/Box.js";
import { hudsData } from "../datasets/hudsData.js";

export class BoxSequence extends ex.Actor {
  constructor(rdnNumber = 1, mapId = "map1") {
    super({
      x: 0,
      y: 0,
      scale: SCALE_2x,
      anchor: ANCHOR_TOP_LEFT,
    });

    this.tileWidth = 19;
    this.tileHeight = 22;
    this.rdnNumber = rdnNumber;
    this.mapId = mapId;
  }

  onInitialize(engine) {
    console.log(this.rdnNumber);
    [...hudsData[this.rdnNumber]].forEach(({ x, y, w, h }) => {
      // [...hudsData[1]].forEach(({ x, y, w, h }) => {
      const floor = new Box(x, y, w, h, this.mapId);
      engine.add(floor);
    });
  }
}

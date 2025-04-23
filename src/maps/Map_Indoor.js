import * as ex from "excalibur";
import { Images } from "../resources.js";
import { ANCHOR_TOP_LEFT, SCALE_2x } from "../constants.js";
import { Floor } from "../actors/Floor.js";

const mapSprite = Images.indoorImage.toSprite();

export class Map_Indoor extends ex.Actor {
  constructor() {
    super({
      x: 0,
      y: 0,
      scale: SCALE_2x,
      anchor: ANCHOR_TOP_LEFT,
    });
    this.graphics.use(mapSprite);

    this.tileWidth = 19;
    this.tileHeight = 22;
  }

  onInitialize(engine) {
    [
      // Top wall
      { x: 0, y: 0, w: 20, h: 1 },

      // Right wall
      { x: 19, y: 1, w: 1, h: 20 },

      // Bottom wall
      { x: 0, y: 19, w: 20, h: 1 },

      //Left wall
      { x: 0, y: 0, w: 1, h: 20 },
    ].forEach(({ x, y, w, h }) => {
      const floor = new Floor(x, y, w, h);
      engine.add(floor);
    });
  }

  // getPlayerStartingPosition() {
  //   return randomFromArray([
  //     [200, 225],
  //     [450, 225],
  //     [300, 325],
  //     [450, 325],
  //   ]);
  // }
}

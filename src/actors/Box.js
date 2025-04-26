import * as ex from "excalibur";
import { ANCHOR_TOP_LEFT, SCALE, SCALE_2x } from "../constants.js";
import { Huds } from "../resources.js";

const boxHudMap = {
  map1: Huds.blueHud,
  map2: Huds.greenHud,
  map3: Huds.metalHud,
};

export class Box extends ex.Actor {
  constructor(x, y, cols, rows, mapId) {
    const SIZE = 16;

    super({
      width: SIZE * cols,
      height: SIZE * rows,
      pos: new ex.Vector(x * SIZE * SCALE, y * SIZE * SCALE),
      scale: SCALE_2x,
      anchor: ANCHOR_TOP_LEFT,
      collider: ex.Shape.Box(SIZE * cols, SIZE * rows, ex.Vector.Zero),
      collisionType: ex.CollisionType.Fixed,
      color: ex.Color.Red,
    });
    const sprite = boxHudMap[mapId].toSprite();
    // const sprite = Huds.blueHud.toSprite(); // convert to sprite
    this.graphics.use(sprite);
    this.graphics.opacity = 1;
  }
}

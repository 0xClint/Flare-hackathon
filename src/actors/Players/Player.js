import * as ex from "excalibur";
import {
  ANCHOR_CENTER,
  DOWN,
  EVENT_SEND_PLAYER_UPDATE,
  LEFT,
  SCALE_2x,
  TAG_ANY_PLAYER,
  TAG_DAMAGES_PLAYER,
  TAG_PLAYER_WEAPON,
  UP,
} from "../../constants.js";
import { DirectionQueue } from "../../classes/DirectionQueue.js";
import { DrawShapeHelper } from "../../classes/DrawShapeHelper.js";
import { generateCharacterAnimations } from "../../character-animations.js";
import { PlayerAnimations } from "./PlayerAnimations.js";
import { PlayerActions } from "./PlayerActions.js";
import { NetworkUpdater } from "../../classes/NetworkUpdater.js";

const ACTION_1_KEY = ex.Input.Keys.Z;
const ACTION_2_KEY = ex.Input.Keys.X;

export class Player extends ex.Actor {
  constructor(x, y, skinId) {
    super({
      pos: new ex.Vector(x, y),
      width: 32,
      height: 32,
      scale: SCALE_2x,
      collider: ex.Shape.Box(15, 15, ANCHOR_CENTER, new ex.Vector(0, 6)),
      collisionType: ex.CollisionType.Active,
      color: ex.Color.Blue,
    });

    this.directionQueue = new DirectionQueue();
    this.facing = DOWN;
    this.actionAnimation = null;
    this.isPainFlashing = false;
    this.skinId = skinId;
    this.skinAnims = generateCharacterAnimations(skinId);
    this.graphics.use(this.skinAnims["DOWN"]["WALK"]);
    this.addTag(TAG_ANY_PLAYER);

    this.on("collisionstart", (evt) => this.onCollisionStart(evt));
  }

  onInitialize(engine) {
    //new DrawShapeHelper(this);
    this.playerAnimations = new PlayerAnimations(this);
    this.playerActions = new PlayerActions(this);
    this.networkUpdater = new NetworkUpdater(engine, EVENT_SEND_PLAYER_UPDATE);
  }

  onCollisionStart(evt) {
    // Take damage from other Player's weapons
    if (evt.other.hasTag(TAG_PLAYER_WEAPON) && evt.other.owner !== this) {
      this.takeDamage();
      evt.other.onDamagedSomething();
    }

    // Take damage from external things (Enemies, etc)
    if (evt.other.hasTag(TAG_DAMAGES_PLAYER)) {
      this.takeDamage();
    }
  }

  takeDamage() {
    // No pain if already in pain
    if (this.isPainFlashing) {
      return;
    }

    // Start a new pain moment
    const PAIN_VELOCITY = 150;
    this.painState = {
      msLeft: 220,
      painVelX: this.facing === LEFT ? PAIN_VELOCITY : -PAIN_VELOCITY,
      painVelY: this.facing === UP ? PAIN_VELOCITY : -PAIN_VELOCITY,
    };

    // Flash for a little bit
    this.playerActions?.flashSeries();
  }

  // Concats enough state to send to other players
  createNetworkUpdateString() {
    const actionType = this.actionAnimation?.type ?? "NULL";
    const isInPain = Boolean(this.painState);
    const x = Math.round(this.pos.x);
    const y = Math.round(this.pos.y);
    return `${actionType}|${x}|${y}|${this.vel.x}|${this.vel.y}|${this.skinId}|${this.facing}|${isInPain}|${this.isPainFlashing}`;
  }

  onPreUpdate(engine, delta) {
    this.directionQueue.update(engine);

    // Work on dedicated animation if we are doing one
    this.playerAnimations.progressThroughActionAnimation(delta);

    if (!this.actionAnimation) {
      this.onPreUpdateMovement(engine, delta);
      this.onPreUpdateActionKeys(engine);
    }

    // Show the right frames
    this.playerAnimations.showRelevantAnim();

    // Update everybody else
    const networkUpdateStr = this.createNetworkUpdateString();
    this.networkUpdater.sendStateUpdate(networkUpdateStr);
  }

  onPreUpdateMovement(engine, delta) {
    // Work down pain state
    if (this.painState) {
      this.vel.x = this.painState.painVelX;
      this.vel.y = this.painState.painVelY;

      // Work on getting rid of pain
      this.painState.msLeft -= delta;
      if (this.painState.msLeft <= 0) {
        this.painState = null;
      }
      return;
    }

    const keyboard = engine.input.keyboard;
    const WALKING_SPEED = 160;

    this.vel.x = 0;
    this.vel.y = 0;
    if (
      keyboard.isHeld(ex.Input.Keys.Left) ||
      keyboard.isHeld(ex.Input.Keys.KeyA)
    ) {
      this.vel.x = -1;
    }
    if (
      keyboard.isHeld(ex.Input.Keys.Right) ||
      keyboard.isHeld(ex.Input.Keys.KeyD)
    ) {
      this.vel.x = 1;
    }
    if (
      keyboard.isHeld(ex.Input.Keys.Up) ||
      keyboard.isHeld(ex.Input.Keys.KeyW)
    ) {
      this.vel.y = -1;
    }
    if (
      keyboard.isHeld(ex.Input.Keys.Down) ||
      keyboard.isHeld(ex.Input.Keys.KeyS)
    ) {
      this.vel.y = 1;
    }

    // Normalize walking speed
    if (this.vel.x !== 0 || this.vel.y !== 0) {
      this.vel = this.vel.normalize();
      this.vel.x = this.vel.x * WALKING_SPEED;
      this.vel.y = this.vel.y * WALKING_SPEED;
    }

    this.facing = this.directionQueue.direction ?? this.facing;
  }

  onPreUpdateActionKeys(engine) {
    // Register action keys
    if (engine.input.keyboard.wasPressed(ACTION_1_KEY)) {
      this.playerActions.actionSwingSword();
      return;
    }

    if (engine.input.keyboard.wasPressed(ACTION_2_KEY)) {
      this.playerActions.actionShootArrow();
      return;
    }

    // Listen for Number keys to change skin
    [
      { key: ex.Input.Keys.Digit1, skinId: "RED" },
      { key: ex.Input.Keys.Digit2, skinId: "BLUE" },
      { key: ex.Input.Keys.Digit3, skinId: "GRAY" },
      { key: ex.Input.Keys.Digit4, skinId: "YELLOW" },
    ].forEach(({ key, skinId }) => {
      if (engine.input.keyboard.wasPressed(key)) {
        this.skinId = skinId;
        this.skinAnims = generateCharacterAnimations(skinId);
      }
    });

    // JUST FOR Testing, fake pain on SPACE key
    if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
      this.takeDamage();
    }
  }
}

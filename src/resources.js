import * as ex from "excalibur";

const Images = {
  // Characters
  redSheetImage: new ex.ImageSource("/sprites/character-red-sheet.png"),
  blueSheetImage: new ex.ImageSource("/sprites/character-blue-sheet.png"),
  graySheetImage: new ex.ImageSource("/sprites/character-gray-sheet.png"),
  yellowSheetImage: new ex.ImageSource("/sprites/character-yellow-sheet.png"),
  monsterSheetImage: new ex.ImageSource("/sprites/monster-sheet.png"),

  // Maps
  blueMapImage: new ex.ImageSource("/maps/blue.png"),
  greenMapImage: new ex.ImageSource("/maps/green.png"),
  metalMapImage: new ex.ImageSource("/maps/metal.png"),

  // Weapons
  swordSheetImage: new ex.ImageSource("/sprites/sword-sheet.png"),
  arrowSheetImage: new ex.ImageSource("/sprites/arrow-sheet.png"),

  // Effects
  explosionSheetImage: new ex.ImageSource("/sprites/explosion-sheet.png"),
};
const Huds = {
  blueHud: new ex.ImageSource("/huds/bluehud.png"),
  greenHud: new ex.ImageSource("/huds/greenhud.png"),
  metalHud: new ex.ImageSource("/huds/metalhud.png"),
};

const Sounds = {};

const loader = new ex.Loader();
loader.suppressPlayButton = true;
const allResources = { ...Images, ...Sounds, ...Huds };
for (const res in allResources) {
  loader.addResource(allResources[res]);
}

export { loader, Images, Sounds, Huds };

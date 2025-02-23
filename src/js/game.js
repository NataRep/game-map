import Path from "./components/game-field/path.js";
import Character from "./components/game-field/character.js";
import GameField from "./components/game-field/game-field.js";
import Toolbar from "./components/tools-bar/toolsbar.js";
import Rating from "./components/rating/rating.js";
import { data } from "./data/data.js";

class Game {
  constructor() {
    this.gameField = new GameField();
    this.path = new Path();
    this.toolbar = new Toolbar(this);
    this.character = null;
    this.rating = new Rating(data.rating, data.friends);
  }

  init() {
    const container = document.createElement("main");
    container.id = "game-container";
    document.body.append(container);

    this.gameField.init();

    this.character = new Character(this.gameField.ctx, this.path);
    this.toolbar.init();
    this.updateCanvas();
    this.rating.init();
  }

  moveToNextPoint() {
    this.character.moveToNextPoint();
    this.updateCanvas();
  }

  updateCanvas() {
    this.gameField.updateCanvas();
    this.character.draw();
  }
}

export default Game;

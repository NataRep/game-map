class MapRenderer {
  constructor(gameField) {
    this.gameField = gameField;
    this.map = null;
    this.ctx = null;
    this.backgroundImage = null;
    this.backgroundImageUrl = "../src/images/bg.jpg";

    this.createMap();
  }

  createMap() {
    this.map = document.createElement("canvas");
    this.map.classList.add("game-field__map", "map");
    this.gameField.field.append(this.map);
    this.map.width = 980;
    this.map.height = 630;
    this.ctx = this.map.getContext("2d");
  }

  setBackgroundImage() {
    const img = new Image();
    img.src = this.backgroundImageUrl;
    img.onload = () => {
      this.backgroundImage = img;
      this.updateCanvas();
    };
  }

  updateCanvas() {
    this.ctx.clearRect(0, 0, this.map.width, this.map.height);

    if (this.backgroundImage) {
      this.ctx.drawImage(
        this.backgroundImage,
        0,
        0,
        this.map.width,
        this.map.height
      );
    }

    if (this.gameField.character) {
      this.gameField.character.draw();
    }
  }
}

export default MapRenderer;

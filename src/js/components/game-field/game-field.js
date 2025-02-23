class GameField {
  constructor() {
    this.field = null;
    this.map = null;
    this.ctx = null;
    this.backgroundImage = null;
    this.backgroundImageUrl = "../src/images/bg.jpg";
  }

  init() {
    this.createField();
    this.createMap();
    this.setBackgroundImage();
  }

  createField() {
    this.field = document.createElement("div");
    this.field.classList.add("game-field");
    const container = document.getElementById("game-container");
    container.append(this.field);
  }

  createMap() {
    this.map = document.createElement("canvas");
    this.map.classList.add("game-field__map", "map");
    this.field.append(this.map);
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
    if (!this.ctx) return;
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
  }
}

export default GameField;

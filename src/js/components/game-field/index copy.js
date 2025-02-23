class GameField {
  constructor() {
    this.field = null;
    this.map = null;
    this.toolbar = null;
    this.character = null;
    this.path = [];
    this.currentPointIndex = 0;
    this.backgroundImage = null; // Здесь будет объект Image
    this.backgroundImageUrl = "../src/images/bg.jpg"; // URL фона
    this.characterImage = new Image(); // Изображение персонажа
    this.characterImage.src = "../src/images/character.png"; // URL персонажа
    this.isMoving = false;
  }

  init() {
    this.createField();
    this.createMap();
    this.createToolBar();
    this.createCharacter();
    this.createPath();
    this.setBackgroundImage();
  }

  createField() {
    this.field = document.createElement("section");
    this.field.classList.add("game-field");
    document.body.append(this.field);
  }

  createMap() {
    this.map = document.createElement("canvas");
    this.map.classList.add("game-field__map", "map");
    this.field.append(this.map);
    this.map.width = 980;
    this.map.height = 630;
    this.ctx = this.map.getContext("2d");
  }

  createToolBar() {
    this.toolbar = document.createElement("div");
    this.toolbar.classList.add("game-field__toolbar");
    this.field.append(this.toolbar);

    const moveBtn = document.createElement("button");
    moveBtn.innerText = "Move to next point";
    moveBtn.addEventListener("click", () => this.moveToNextPoint());
    this.toolbar.append(moveBtn);
  }

  createCharacter() {
    this.character = {
      x: 445,
      y: 510,
      width: 20,
      height: 70,
      speed: 5,
      image: this.characterImage,
    };
  }

  drawCharacter() {
    if (this.character.image.complete) {
      this.ctx.drawImage(
        this.character.image,
        this.character.x - this.character.width / 2,
        this.character.y - this.character.height,
        this.character.width,
        this.character.height
      );
    }
  }

  setBackgroundImage() {
    const img = new Image();
    img.src = this.backgroundImageUrl;
    img.onload = () => {
      this.backgroundImage = img;
      this.updateCanvas();
    };
  }

  createPath() {
    this.path = [
      { x: 350, y: 476 },
      { x: 276, y: 517 },
      { x: 190, y: 540 },
      { x: 110, y: 510 },
      { x: 124, y: 446 },
    ];
  }

  async moveToNextPoint() {
    if (this.isMoving || this.currentPointIndex >= this.path.length) return;

    this.isMoving = true;
    const targetPoint = this.path[this.currentPointIndex];

    const animate = () => {
      const dx = targetPoint.x - this.character.x;
      const dy = targetPoint.y - this.character.y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);

      if (distance <= this.character.speed) {
        this.character.x = targetPoint.x;
        this.character.y = targetPoint.y;
        this.isMoving = false;
        this.currentPointIndex++;
        this.updateCanvas();
        return;
      }

      this.character.x += (dx / distance) * this.character.speed;
      this.character.y += (dy / distance) * this.character.speed;

      this.updateCanvas();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  updateCanvas() {
    // Очистка холста
    this.ctx.clearRect(0, 0, this.map.width, this.map.height);

    // Рисование фона
    if (this.backgroundImage) {
      this.ctx.drawImage(
        this.backgroundImage,
        0,
        0,
        this.map.width,
        this.map.height
      );
    }

    // Рисование элементов
    //this.drawPath();
    this.drawCharacter();
  }
}

export default GameField;

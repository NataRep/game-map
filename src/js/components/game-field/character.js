class Character {
  constructor(ctx, path) {
    // Сохраняем контекст и canvas
    this.ctx = ctx;
    this.canvas = ctx.canvas;

    // Инициализация пути движения
    this.path = path.points;
    this.currentPointIndex = 0;

    // Настройка персонажа
    this.width = 20;
    this.height = 70;
    this.speed = 5;
    this.isMoving = false;
    this.isLoaded = false;

    // Инициализация позиции
    const startPoint = this.path[0];
    this.x = startPoint.x;
    this.y = startPoint.y;

    // Настройка изображения
    this.image = new Image();
    this.image.onload = this.handleImageLoad.bind(this);
    this.image.onerror = this.handleImageError.bind(this);
    this.image.src = "../src/images/character.png";

    // Управление анимацией
    this.animationFrameId = null;
    this.startAnimationLoop();
  }

  handleImageLoad() {
    this.isLoaded = true;
    this.draw();
  }

  handleImageError() {
    console.error("Failed to load character image");
    this.isLoaded = false;
    this.draw();
  }

  startAnimationLoop() {
    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.draw();

      this.animationFrameId = requestAnimationFrame(animate);
    };
    this.animationFrameId = requestAnimationFrame(animate);
  }

  stopAnimationLoop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  draw() {
    const drawX = this.x - this.width / 2;
    const drawY = this.y - this.height;

    this.ctx.drawImage(this.image, drawX, drawY, this.width, this.height);
  }

  moveToNextPoint() {
    if (this.isMoving || this.currentPointIndex >= this.path.length - 1) return;

    this.isMoving = true;
    this.currentPointIndex++;
    const targetPoint = this.path[this.currentPointIndex];

    const animateMove = () => {
      const dx = targetPoint.x - this.x;
      const dy = targetPoint.y - this.y;
      const distance = Math.sqrt(dx ** 2 + dy ** 2);

      if (distance <= this.speed) {
        this.x = targetPoint.x;
        this.y = targetPoint.y;
        this.isMoving = false;
        return;
      }

      this.x += (dx / distance) * this.speed;
      this.y += (dy / distance) * this.speed;

      requestAnimationFrame(animateMove);
    };

    requestAnimationFrame(animateMove);
  }

  // Метод для безопасного удаления
  destroy() {
    this.stopAnimationLoop();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Character;

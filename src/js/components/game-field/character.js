class Character {
  constructor(ctx, path) {
    this.ctx = ctx;
    this.path = path.points;
    this.currentPointIndex = 0;
    this.isMoving = false;

    const startPoint = this.path[0];
    this.x = startPoint.x;
    this.y = startPoint.y;

    this.width = 20;
    this.height = 70;
    this.speed = 5;
    this.image = new Image();
    this.image.src = "../src/images/character.png";

    this.x = this.path[0].x;
    this.y = this.path[0].y;

    this.image.onload = () => {
      this.draw();
      this.moveToNextPoint();
    };
  }

  draw() {
    if (this.image.complete) {
      this.ctx.drawImage(
        this.image,
        this.x - this.width / 2,
        this.y - this.height,
        this.width,
        this.height
      );
    }
  }

  moveToNextPoint() {
    if (this.isMoving || this.currentPointIndex >= this.path.length - 1) return;

    this.isMoving = true;
    this.currentPointIndex++;
    const targetPoint = this.path[this.currentPointIndex];

    const animate = () => {
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

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
}

export default Character;

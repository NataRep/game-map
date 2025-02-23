class Toolbar {
  constructor(game) {
    this.game = game;
    this.toolbar = null;
  }

  init() {
    this.toolbar = document.createElement("div");
    const container = document.getElementById("game-container");
    this.toolbar.classList.add("toolbar");
    container.append(this.toolbar);
    this.createMainButton();
  }

  createMainButton() {
    const moveBtn = document.createElement("button");
    moveBtn.classList.add("button_move");
    moveBtn.innerHTML = "В универ";
    moveBtn.addEventListener("click", () => this.game.moveToNextPoint());
    this.toolbar.append(moveBtn);
  }
}

export default Toolbar;

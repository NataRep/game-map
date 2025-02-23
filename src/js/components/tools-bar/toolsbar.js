class Toolbar {
  constructor(game) {
    this.game = game;
    this.toolbar = null;
    this.buttons = [
      { classList: ["btn", "btn_chat"], handler: null, text: "" },
      {
        classList: ["btn", "btn_move"],
        handler: this.game.moveToNextPoint.bind(game),
        text: "В универ",
      },
      { classList: ["btn", "btn_mail"], handler: null, text: "" },
      { classList: ["btn", , "btn_rating"], handler: null, text: "" },
    ];
  }

  init() {
    this.toolbar = document.createElement("div");
    const container = document.getElementById("game-container");
    this.toolbar.classList.add("toolbar");
    container.append(this.toolbar);
    //this.createMainButton();

    this.createButtons();
  }

  createButtons() {
    this.buttons.forEach((button) => {
      this.createButton(button.classList, button.handler, button.text);
    });
  }

  createButton(classArray, fn, text) {
    const btn = document.createElement("button");
    classArray.forEach((str) => {
      btn.classList.add(str);
    });
    if (fn) btn.addEventListener("click", () => fn());
    if (text) btn.innerHTML = text;
    this.toolbar.append(btn);
  }
}

export default Toolbar;

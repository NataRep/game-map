class Rating {
  constructor(data, friends) {
    this.data = data;
    this.dataFriends = friends;
    this.popup = null;
    this.closeBtn = null;
    this.table = null;
    this.popupWrapper = null;
    this.tableRows = [];
    this.isOpen = false;
  }

  init() {
    this.sortData();
    this.createPopup();
    this.createTable();
    this.populateTable();
    this.addEventListeners();
  }

  sortData() {
    this.data.sort((a, b) => +b.points - +a.points);
  }

  createPopup() {
    this.popupWrapper = document.createElement("div");
    this.popupWrapper.classList.add("popup-wrapper");

    this.popup = document.createElement("div");
    this.popup.classList.add("rating-popup");

    this.closeBtn = document.createElement("button");
    this.closeBtn.classList.add("rating-popup__close");

    this.table = document.createElement("div");
    this.table.classList.add("rating-popup__table");

    const title = document.createElement("div");
    title.classList.add("rating-popup__title");
    title.innerHTML = "Рейтинг игроков";

    this.popup.append(this.closeBtn, title, this.table);
    this.popupWrapper.append(this.popup);

    const gamContainer = document.getElementById("game-container");
    gamContainer.append(this.popupWrapper);
  }

  createTable() {
    const header = document.createElement("div");
    header.classList.add("table-header");
    header.innerHTML = `<div class="table-cell cell_position">Место</div>
    <div class="table-cell cell_avatar"></div>
    <div class="table-cell cell_name">Имя Фамилия</div>
    <div class="table-cell cell_points">Опыт</div>`;

    this.tableBody = document.createElement("div");
    this.tableBody.classList.add("table-body");
    this.table.append(header, this.tableBody);
  }

  populateTable() {
    this.data.forEach((item, index) => {
      const isFriend = this.dataFriends.some((person) => person.id === item.id);
      const row = document.createElement("div");
      row.classList.add("table-row");

      if (isFriend) row.classList.add("friend");
      row.innerHTML = `<div class="table-cell cell_position">${index + 1}</div>
      <div class="table-cell cell_avatar"><img src="${item.img}" onerror="this.remove();"></div>
      <div class="table-cell cell_name">${item.name} ${item.lastName}</div>
      <div class="table-cell cell_points">${item.points}</div>`;
      this.tableBody.append(row);
      this.tableRows.push(row);
    });
  }

  addEventListeners() {
    this.closeBtn.addEventListener("click", () => this.close());
  }

  open() {
    this.popupWrapper.classList.add("visible");
    this.popup.classList.add("move-down");
    this.isOpen = true;
  }

  close() {
    this.popupWrapper.classList.remove("visible");
    this.popup.classList.remove("move-down");
    this.isOpen = false;
  }
}

export default Rating;

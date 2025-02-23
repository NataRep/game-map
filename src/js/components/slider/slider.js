class Slider {
  constructor() {
    this.slider = null;
    this.wrapper = null;
    this.slidersList = null;
    this.slides = [];
    this.prevBtn = null;
    this.nextBtn = null;
    this.speed = 4;
    this.index = 0;
    this.visibleSlides = 8;
  }

  init() {
    this.createWrapper();
    this.createSlideList();
    this.fillSlider();
    this.createBtns();
    this.addEventListeners();
  }

  fillSlider() {
    //генерация начальных пустых слайдов
    let withPlus = false;
    for (let i = 0; i < this.visibleSlides; i++) {
      if (i === 0) {
        withPlus = true;
      } else {
        withPlus = false;
      }
      this.createSlide(null, withPlus);
    }

    //генерация слайдов для демонстрации вращения слайдера
    for (let i = 0; i < this.visibleSlides; i++) {
      this.createSlide(null, withPlus);
    }

    //заполнение слайдов для демонстрации
    for (let i = 0; i < this.visibleSlides; i++) {
      this.fillSlide(this.slides[i]);
    }
  }

  createWrapper() {
    const container = document.querySelector(".toolbar");
    this.slider = document.createElement("div");
    this.slider.classList.add("slider");

    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("slider__wrapper");

    this.slider.append(this.wrapper);
    container.append(this.slider);
  }

  createSlideList() {
    this.slideList = document.createElement("div");
    this.slideList.classList.add("slider__list");
    this.wrapper.append(this.slideList);
  }

  createSlide(isFill, withPlus) {
    const slide = document.createElement("div");
    slide.classList.add("slider__slide", "slide");
    this.slideList.append(slide);

    if (isFill) slide.classList.add("slide_fill");
    if (withPlus) {
      const plus = document.createElement("div");
      plus.classList.add("slide__plus");

      slide.classList.add("slide_withPlus");
      slide.append(plus);
    }

    this.slides.push(slide);
  }

  fillSlide(slide) {
    slide.classList.add("slide_fill");
    const inner = document.createElement("div");
    inner.classList.add("slide__inner");
    slide.append(inner);
  }

  createBtns() {
    this.prevBtn = document.createElement("div");
    this.prevBtn.classList.add("slider__prev", "arrow");
    this.slider.prepend(this.prevBtn);

    this.nextBtn = document.createElement("div");
    this.nextBtn.classList.add("slider__next", "arrow");
    this.slider.append(this.nextBtn);
  }

  addEventListeners() {
    this.prevBtn.addEventListener("click", () => this.moveSlide(-1));
    this.nextBtn.addEventListener("click", () => this.moveSlide(1));
  }

  moveSlide(direction) {
    const slideWidth = this.slides[0].offsetWidth + 11;
    this.index = Math.max(
      0,
      Math.min(this.index + direction, this.slides.length - this.visibleSlides)
    );
    this.slideList.style.transform = `translateX(-${this.index * slideWidth}px)`;
  }
}

export default Slider;

/* function initCarouselSlider(
  $container,
  data,
  renderFn,
  titleText,
  linkText,
  linkURL
) {
  //если данных недостаточно
  if (data.length < 4) return;

  // Генерация разметки
  renderCarouselSliderTemplates($container, titleText, linkText, linkURL);
  const $slider = $container.find(`.slider-carousel`);

  // Генерация слайдов
  renderSliders();

  //обработчики
  initCarouselSliderHandlers($slider);

  function renderSliders() {
    const $slidesList = $slider.find(`.slider-carousel__list`);
    let slidesHtml = "";
    data.forEach((item) => {
      const slide = renderFn(item);
      slidesHtml += slide;
    });
    $slidesList.html(slidesHtml);
  }
}

export function initCarouselSliderHandlers($slider) {
  const $buttonPrev = $slider.find(`.slider-carousel__button-prev`);
  const $buttonNext = $slider.find(`.slider-carousel__button-next`);
  const $slidesList = $slider.find(`.slider-carousel__list`);
  const $slide = $slidesList.find(".slider-carousel__slide");

  let index = 0;
  let slideWidth = 0;
  let count = 0;
  let translateX = 0;
  let startX = 0;

  // Функция пересчета размеров
  function updateDimensions() {
    slideWidth = $slide.outerWidth();
    count = Math.max(1, Math.floor($slider.outerWidth() / slideWidth));
  }

  // Пересчет размеров при загрузке
  updateDimensions();

  // Прокрутка слайдов
  function buttonHandler(direction) {
    const totalSlides = $slide.length;
    const visibleSlides = count;
    const maxIndex = Math.ceil(totalSlides / visibleSlides) - 1;

    if (direction === "prev") {
      index = Math.min(index + 1, 0);
    } else {
      index = Math.max(index - 1, -maxIndex);
    }

    // Расчет смещения
    const remainingSlides = totalSlides - Math.abs(index * visibleSlides);

    if (remainingSlides <= visibleSlides) {
      translateX = -(totalSlides * slideWidth - $slider.outerWidth());
      checkButtons();
      index += 1;
    } else {
      translateX = index * slideWidth * visibleSlides;
      checkButtons();
    }

    $slidesList.css("transform", `translateX(${translateX}px)`);
  }

  function checkButtons() {
    const totalSlides = $slide.length;
    const maxIndex = Math.ceil(totalSlides / count) - 1;

    if (index >= 0) {
      $buttonPrev.addClass("hidden");
    } else {
      $buttonPrev.removeClass("hidden");
    }

    if (Math.abs(index) >= maxIndex) {
      $buttonNext.addClass("hidden");
    } else {
      $buttonNext.removeClass("hidden");
    }
  }

  // Добавляем/удаляем обработчики свайпов в зависимости от ширины экрана
  function enableSwipeHandlers() {
    $slidesList.on("touchstart", onTouchStart);
    $slidesList.on("touchend", onTouchEnd); // Включаем `touchend`
  }

  function disableSwipeHandlers() {
    $slidesList.off("touchstart", onTouchStart);
    $slidesList.off("touchend", onTouchEnd); // Убираем `touchend`
  }

  function checkScreenWidth() {
    if (window.innerWidth > 768) {
      enableSwipeHandlers();
    } else {
      disableSwipeHandlers();
    }
  }

  // Обработчики событий свайпов
  function onTouchStart(e) {
    startX = e.originalEvent.touches[0].pageX;
  }

  function onTouchEnd(e) {
    const endX = e.originalEvent.changedTouches[0].pageX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      // Чувствительность свайпа
      if (diffX > 0) {
        buttonHandler("next");
      } else {
        buttonHandler("prev");
      }
    }
  }

  $buttonPrev.on("click", () => {
    if (index < 0) buttonHandler("prev");
  });

  $buttonNext.on("click", () => {
    if (index > -Math.ceil($slide.length / count) + 1) buttonHandler("next");
  });

  // Проверка ширины экрана при загрузке и изменении размера окна
  $(window).on("resize", () => {
    updateDimensions();
    index = 0;
    $slidesList.css("transform", "translateX(0)");
    checkButtons();
    $slider.scrollLeft(0);
    checkScreenWidth();
  });

  // Начальная настройка
  updateDimensions();
  checkButtons();
  checkScreenWidth();
}
  */

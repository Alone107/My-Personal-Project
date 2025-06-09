// Группируем элементы в объекты для лучшей организации
const hireElements = {
  button: document.getElementById("hireBtn"),
  popup: document.querySelector(".hire-popup"),
  reset: document.getElementById("btnHireReset"),
};

const connectElements = {
  button: document.getElementById("ConnectBtn"),
  popup: document.querySelector(".connect-popup"),
  reset: document.getElementById("btnConnectReset"),
};

const creditsElements = {
  button: document.getElementById("CreditsBtn"),
  popup: document.querySelector(".credits-popup"),
};

const sharedElements = {
  container: document.querySelector(".container-wrap"),
  shadow: document.querySelector(".shadow"),
};

const settingsElements = {
  button: document.getElementById("SettingsBtn"),
  popup: document.querySelector(".settings-popup"),
  reset: document.getElementById("btnSettingsReset"),
};

const projectSingleElements = {
  button: document.getElementById("singleProductBtnPopup"),
  popup: document.querySelector(".single-project-popup"),
  reset: document.getElementById("projectPopupClose"),
};

// Функция для открытия попапа
const openPopup = (elements) => {
  elements.popup.classList.add("open");
  sharedElements.container.classList.add("open");
  sharedElements.shadow.classList.add("open");
};

// Функция для открытия попапа
const openPopupSettings = (elements) => {
  elements.popup.classList.add("open");
  sharedElements.container.classList.add("openDown");
  sharedElements.shadow.classList.add("open");
};

// Функция для закрытия попапа
const closePopupSettings = (elements) => {
  elements.popup.classList.remove("open");
  sharedElements.container.classList.remove("openDown");
  sharedElements.shadow.classList.remove("open");
};

// Функция для закрытия попапа
const closePopup = (elements) => {
  elements.popup.classList.remove("open");
  sharedElements.container.classList.remove("open");
  sharedElements.shadow.classList.remove("open");
};

// Добавляем обработчики событий
hireElements.button.addEventListener("click", () => openPopup(hireElements));
hireElements.reset.addEventListener("click", () => closePopup(hireElements));

connectElements.button.addEventListener("click", () =>
  openPopup(connectElements)
);
connectElements.reset.addEventListener("click", () =>
  closePopup(connectElements)
);

creditsElements.button.addEventListener("click", () =>
  openPopup(creditsElements)
);

// Добавляем обработчики событий
settingsElements.button.addEventListener("click", () =>
  openPopupSettings(settingsElements)
);

if (projectSingleElements.button) {
  projectSingleElements.button.addEventListener("click", () =>
    openPopupSettings(projectSingleElements)
  );

  projectSingleElements.reset.addEventListener("click", () =>
    closePopupSettings(projectSingleElements)
  );
}

// Объединяем обработчики для тени
sharedElements.shadow.addEventListener("click", () => {
  closePopup(hireElements);
  closePopup(connectElements);
  closePopup(creditsElements);
  closePopupSettings(projectSingleElements);
});

// -----------------time---------------------------

function updateClock() {
  const now = new Date();

  // Локальное время
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("time").textContent = `${hours}:${minutes}`;

  // Время Москвы
  const moscowTime = new Date().toLocaleTimeString("ru-RU", {
    timeZone: "Europe/Moscow",
    hour: "2-digit",
    minute: "2-digit",
    second: "numeric",
  });

  // Извлекаем часы и минуты из форматированной строки
  const [moscowHours, moscowMinutes] = moscowTime.split(":").slice(0, 2);
  document.getElementById(
    "time-moskow"
  ).textContent = `${moscowHours}:${moscowMinutes}`;
}
updateClock(); // Первый вызов
setInterval(updateClock, 60000); // Обновление раз в минуту

// --------------time-----------------------------

// ----------------------settings---------------------------------

function initializeSlider(sliderId, selectorId) {
  const slider = document.getElementById(sliderId);
  const selector = document.getElementById(selectorId);

  if (!slider || !selector) return;

  slider.oninput = function () {
    selector.style.left = `${this.value}%`;
  };
}

initializeSlider("sliderSettingsOne", "selectorSliderOne");
initializeSlider("sliderSettingsTwo", "selectorSliderTwo");
initializeSlider("sliderSettingsThree", "selectorSliderThree");

// ---------------text-------------------

const sliderThree = document.getElementById("sliderSettingsThree");
const selectBtn = document.getElementById("selectorSliderThree");
const largestSpan = document.getElementById("largestValue");
const smallestSpan = document.getElementById("smallestValue");

// Сохраняем исходные значения
const originalValues = {
  "--text-small": "7px",
  "--text-smaller": "12px",
  "--text": "14px",
  "--text-medium": "16px",
  "--text-big": "18px",
  "--text-BIG": "26px",
};

// Сохраняем последнее сохранённое значение ползунка
let lastSavedSliderValue;

document.querySelector(".shadow").addEventListener("click", function () {
  if (document.querySelector(".settings-popup").classList.contains("open")) {
    sliderThree.value = lastSavedSliderValue;
    selectBtn.style.left = lastSavedSliderValue + "%";
    updateCSSVariables(lastSavedSliderValue);
    updateResult();
    closePopupSettings(settingsElements);
  }
});

// Обновляем позицию кнопки при движении ползунка
sliderThree.addEventListener("input", () => {
  selectBtn.style.left = this.value + "%";
  updateCSSVariables(sliderThree.value);
});

function updateCSSVariables(value) {
  const root = document.documentElement;
  const difference = Math.round((value - 50) / 10); // Получаем разницу в пикселях

  const cssVars = [
    "--text-small",
    "--text-smaller",
    "--text",
    "--text-medium",
    "--text-big",
    "--text-BIG",
  ];

  const baseValues = [7, 12, 14, 16, 18, 26];

  cssVars.forEach((varName, index) => {
    const newValue = baseValues[index] + difference;
    root.style.setProperty(varName, `${newValue}px`);

    // Обновляем отображаемые значения
    if (varName === "--text-BIG") {
      largestSpan.textContent = `${newValue}px`;
    } else if (varName === "--text-small") {
      smallestSpan.textContent = `${newValue}px`;
    }
  });
}

// Обработчик для кнопки сброса
document.getElementById("btnSettingsReset").addEventListener("click", () => {
  sliderThree.value = lastSavedSliderValue;
  selectBtn.style.left = lastSavedSliderValue + "%";
  updateCSSVariables(lastSavedSliderValue);
  updateResult();
  closePopupSettings(settingsElements);
});

// Обработчик для кнопки сохранения
document.getElementById("btnSettingsComplete").addEventListener("click", () => {
  const root = document.documentElement;
  const cssVars = [
    "--text-small",
    "--text-smaller",
    "--text",
    "--text-medium",
    "--text-big",
    "--text-BIG",
  ];

  cssVars.forEach((varName) => {
    originalValues[varName] = root.style.getPropertyValue(varName);
  });

  // Сохраняем текущее значение ползунка
  lastSavedSliderValue = sliderThree.value;
  closePopupSettings(settingsElements);
});

function updateResult() {
  const root = document.documentElement;
  const cssVars = [
    "--text-small",
    "--text-smaller",
    "--text",
    "--text-medium",
    "--text-big",
    "--text-BIG",
  ];

  cssVars.forEach((varName) => {
    const value = getComputedStyle(root).getPropertyValue(varName);
    if (varName === "--text-BIG") {
      largestSpan.textContent = value;
    } else if (varName === "--text-small") {
      smallestSpan.textContent = value;
    }
  });
}

// Инициализация при загрузке
sliderThree.dispatchEvent(new Event("input"));

// -----------------------settings-color-----------------------------------

const sliderOneColor = document.getElementById("sliderSettingsOne");
const sliderOneSelector = document.getElementById("selectorSliderOne");
const sliderTwoSelector = document.getElementById("selectorSliderTwo");
const sliderTwoColor = document.getElementById("sliderSettingsTwo");
const SpanColorOneSlider = document.getElementById("SpanColorOneSlider");
const SpanColorTwoSlider = document.getElementById("SpanColorTwoSlider");

const colorMap = {
  0: "#2E7D32",
  10: "#263238",
  20: "#FF4081",
  30: "#1565C0",
  40: "#FF9900",
  50: "#e84a4a",
  60: "#1565C0",
  70: "#FFF5E6",
  80: "#1565C0",
  90: "#FF4081",
  100: "#FFEB3B",
};

const colorMap2 = {
  0: "#1565C0",
  10: "#1976D2",
  20: "#4CAF50",
  30: "#2196F3",
  40: "#FFEB3B",
  50: "#ffffff",
  60: "#FFA726",
  70: "#1565C0",
  80: "#2E7D32",
  90: "#4CAF50",
  100: "#263238",
};

// Общая функция для поиска ближайшего ключа
const findNearestKey = (value, keys) => {
  return keys.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
};

// Общая функция обработки события колесика
const handleWheel = (e, slider, step = 10, selector) => {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -step : step;
  slider.value = Math.min(
    parseInt(slider.max),
    Math.max(parseInt(slider.min), parseInt(slider.value) + delta)
  );
  selector.style.left = slider.value + "%";
};

// Общая функция обработки изменения значения
const handleColorChange = (slider, colorMap, variableName, spanColor) => {
  const nearestKey = findNearestKey(
    parseInt(slider.value),
    Object.keys(colorMap)
  );
  const selectedColor = colorMap[nearestKey];
  document.documentElement.style.setProperty(variableName, selectedColor);
  spanColor.textContent = selectedColor;
};

// Настройка первого слайдера
if (sliderOneColor) {
  sliderOneColor.addEventListener("wheel", (e) => {
    handleWheel(e, sliderOneColor, 10, sliderOneSelector);
    handleColorChange(
      sliderOneColor,
      colorMap,
      "--theme-color",
      SpanColorOneSlider
    );
  });
  sliderOneColor.addEventListener("input", () =>
    handleColorChange(
      sliderOneColor,
      colorMap,
      "--theme-color",
      SpanColorOneSlider
    )
  );
}

// Настройка второго слайдера
if (sliderTwoColor) {
  sliderTwoColor.addEventListener("wheel", (e) => {
    handleWheel(e, sliderTwoColor, 10, sliderTwoSelector),
      handleColorChange(
        sliderTwoColor,
        colorMap2,
        "--theme-color-second",
        SpanColorTwoSlider
      );
  });
  sliderTwoColor.addEventListener("input", () =>
    handleColorChange(
      sliderTwoColor,
      colorMap2,
      "--theme-color-second",
      SpanColorTwoSlider
    )
  );
}

//--------------filtr-achievements---------------------

const achievementsAchievedComplete = document.querySelector(
  ".achievements-achieved-complete"
);

const achievementsAchievedProgress = document.getElementById(
  "achievementsAchievedProgress"
);

const achievementsBlocks = document.getElementById("achievementsBlocks");

const inputFiltrAchieved = document.getElementById("achieved-input");
const inputFiltrInProgress = document.getElementById("in-progress-input");

const inputFiltrTodo = document.getElementById("todo-input");

if (inputFiltrAchieved) {
  inputFiltrAchieved.addEventListener("input", function () {
    if (inputFiltrAchieved.checked == true) {
      achievementsAchievedComplete.classList.add("show");
    } else {
      achievementsAchievedComplete.classList.remove("show");
    }
  });
}

if (inputFiltrInProgress) {
  inputFiltrInProgress.addEventListener("input", function () {
    if (inputFiltrInProgress.checked == true) {
      achievementsAchievedProgress.classList.add("show");
    } else {
      achievementsAchievedProgress.classList.remove("show");
    }
  });
}

if (inputFiltrTodo) {
  inputFiltrTodo.addEventListener("input", function () {
    if (inputFiltrTodo.checked == true) {
      achievementsBlocks.classList.add("todo");
    } else {
      achievementsBlocks.classList.remove("todo");
    }
  });
}

// -----------------progress-circle----------------------

const achivmentsBlock = document.querySelectorAll(
  ".achievements-achieved-progress-item"
);
const filterTwo = document.getElementById("achieved-inprogress");

const circle = document.querySelector(".progress-ring-circle");

if (circle) {
  const radius = circle.r.baseVal.value;

  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  function setProgress(percent) {
    const ofset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = ofset;
  }

  let allChallenge = achivmentsBlock.length;
  let finishChallenge = 0;

  for (let i = 0; i < filterTwo.childNodes.length; i++) {
    if (filterTwo.childNodes[i].tagName == "DIV") {
      finishChallenge++;
    }
    finishChallenge;
  }

  let percents = Math.round((finishChallenge / allChallenge) * 100);
  document.querySelector(
    ".achievements-progress-number"
  ).innerHTML = `${finishChallenge}/${allChallenge}`;

  let percentFinish = setProgress(percents);
}

// -------------------projects-slider------------------------------

const swiperProjects = document.querySelector(".swiper-projects");

if (swiperProjects) {
  const swiperProjects = new Swiper(".swiper-projects", {
    // Optional parameters
    centeredSlides: true,
    slidesPerView: 3,
    spaceBetween: 0,
    coverflowEffect: {
      rotate: -45,
      stretch: 0,
      depth: 100,
      modifier: 1,
      scale: 0.8,
      slideShadows: true,
    },
    effect: "coverflow",
    grabCursor: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination--projects",
      type: "fraction",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next-projects",
      prevEl: ".swiper-button-prev-projects",
    },
  });
}

// Получаем элементы
const projectInfo = document.querySelector(".single-project-information-text");
const toggleBtn = document.querySelector(".single-project-show-text");

// Проверяем высоту и устанавливаем начальное состояние

if (projectInfo) {
  if (projectInfo.offsetHeight > 200) {
    projectInfo.setAttribute("data-expanded", "false");
    projectInfo.classList.add("hidden");
    toggleBtn.classList.add("show");
  }

  // Обработчик события
  toggleBtn.addEventListener("click", function () {
    const isExpanded = projectInfo.getAttribute("data-expanded") === "true";

    // Обновляем атрибуты и классы
    projectInfo.setAttribute("data-expanded", !isExpanded);
    projectInfo.classList.toggle("hidden");

    // Обновляем текст кнопки
    toggleBtn.textContent = isExpanded ? "+ expand" : "- expand";
  });
}

const swiperProjectPopup = document.querySelector(".swiper-project-popup");

if (swiperProjectPopup) {
  const swiperProjectPopup = new Swiper(".swiper-project-popup", {
    // Optional parameters
    slidesPerView: 1,
    spaceBetween: 10,
    // If we need pagination
    pagination: {
      el: ".swiper-pagination-project-popup",
      type: "fraction",
      renderFraction: function (currentClass, totalClass) {
        return (
          `<span class="${currentClass}"></span>` +
          " of " +
          `<span class="${totalClass}"></span>`
        );
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next-project-popup",
      prevEl: ".swiper-button-prev-project-popup",
    },
  });
}

const navigationBtnMenu = document.getElementById("navigationBtnMenu");
const navigation = document.getElementById("navigation");

if (navigation && navigationBtnMenu) {
  navigationBtnMenu.addEventListener("click", () => {
    navigation.classList.toggle("show");
  });
}

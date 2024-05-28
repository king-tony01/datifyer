import { spinner } from "./components.js";
import { questions } from "./questions.js";
import {
  initBudget,
  initDate,
  initHobbies,
  initMap,
  initTime,
  intiMedium,
  initAge,
  initOccasion,
  initExtraInfo,
} from "./script.js";

const vibe = decodeURIComponent(location.search.slice(1));
localStorage.setItem(
  "rec_data",
  JSON.stringify({
    date_of_date: "",
    age_of_date: 0,
    location: [],
    time_of_date: "",
    occasion: "",
    budget: "",
    range: "",
    indoor_or_outdoor_activities_preference: "",
    date_interest_or_hobbies: [],
    vibe_or_atmosphere_of_interest: vibe,
    extra_info_about_this_date: "",
  })
);

questions.forEach((question, i) => {
  document.querySelector(".con").insertAdjacentHTML(
    "afterbegin",
    `<div class="form-card input${i}">
                <div class="form-inner">
                  ${question.data}
                </div>
                <div class="buttons">
                  <button class="btn prev">Prev</button>
                  <button class="btn next">Next</button>
                </div>
              </div>`
  );
});

const calendar = document.querySelector(".calendar");

const now = new Date();
let date = now.getDate();
let year = now.getFullYear();
const currentMonth = now.getMonth();
const currentDate = now.getDate();
const totalDays = new Date(year, currentMonth + 1, 0).getDate();
const days = [];
const future = [];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let count = year;
for (let i = 1; i <= totalDays; i++) {
  days.push(i);
}
for (let i = 1; i <= 5; i++) {
  future.push(count++);
}

let calendarObject = { year: year, month: months[currentMonth], days: days };

function setCalendar({ year, month, days }) {
  calendar.innerHTML = `<span class="month-year">${month} ${year} <i class="fas fa-chevron-down"></i></span>
                  <div class="grids">
                  ${days
                    .map(
                      (day) =>
                        `<span class="date-input ${
                          day == currentDate ? "active" : ""
                        }" data-day="${day}">${day}</span>`
                    )
                    .join(" ")}
                  </div>
                  <div class="year-picker">
                    <div class="years">
                    ${future
                      .map((year, i) => {
                        return `
                      <span class="year ${
                        i == 0 ? "active" : ""
                      }">${year}</span>
                      `;
                      })
                      .join("")}
                    </div>
                    <div class="months">
                    ${months
                      .map((mon, i) => {
                        return `
                      <span class="month ${
                        mon == months[currentMonth] ? "active" : ""
                      }">${mon}</span>
                      `;
                      })
                      .join("")}
                    </div>
                  </div> 
                  `;
}

setCalendar(calendarObject);
function updateYear({ year, month }) {
  document.querySelector(
    ".month-year"
  ).innerHTML = `${month} ${year} <i class="fas fa-chevron-down"></i></span>`;
}

function updateMonth({ year, month }) {
  document.querySelector(
    ".month-year"
  ).innerHTML = `${month} ${year} <i class="fas fa-chevron-down"></i></span>`;
}

function updateDays(daysArray) {
  document.querySelector(".grids").innerHTML = "";
  document.querySelector(".grids").innerHTML = `${daysArray
    .map(
      (day) =>
        `<span class="date-input ${
          day == currentDate ? "active" : ""
        }" data-day="${day}">${day}</span>`
    )
    .join(" ")}`;
}

const calendarIndicator = document.querySelector(".month-year");
const table = document.querySelector(".year-picker");
calendarIndicator.addEventListener("click", () => {
  table.classList.toggle("active");
});

const yearTab = document.querySelectorAll(".year");
const monthTab = document.querySelectorAll(".month");

yearTab.forEach((tab) =>
  tab.addEventListener("click", () => {
    let newmonth = Array.from(monthTab).filter((m) =>
      m.classList.contains("active")
    )[0].textContent;
    updateYear({ year: +tab.textContent, month: newmonth });
    initDate({
      month: newmonth,
      year: +tab.textContent,
      date: date,
    });
    yearTab.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    table.classList.remove("active");
  })
);

monthTab.forEach((tab) =>
  tab.addEventListener("click", () => {
    let newyear = +Array.from(yearTab).filter((y) =>
      y.classList.contains("active")
    )[0].textContent;
    updateMonth({
      year: newyear,
      month: tab.textContent,
    });
    const totalDays = new Date(
      newyear,
      months.indexOf(tab.textContent) + 1,
      0
    ).getDate();
    let newDays = [];
    for (let i = 1; i <= totalDays; i++) {
      newDays.push(i);
    }
    updateDays(newDays);
    initDate({
      month: tab.textContent,
      year: newyear,
      date: date,
    });
    monthTab.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    table.classList.remove("active");
  })
);

initDate({
  month: now.toLocaleString("en-US", { month: "long" }),
  year: year,
  date: now.getDate(),
});

let currentIndex = 0;
function nextCardPrev() {
  const currentCard = document.querySelector(`.input${currentIndex}`);
  const nextIndex = currentIndex + 1;
  const nextCard = document.querySelector(`.input${nextIndex}`);
  if (nextCard) {
    setProgress(currentIndex + 2);
    currentCard.style.transform = "translateY(-300px) scale(0)";
    nextCard.style.transform = "translateY(0) scale(1)";
    currentIndex = nextIndex;
    if (nextCard.querySelector(".calendar")) {
      initDate();
    }
    if (nextCard.querySelector("#location")) {
      initMap();
    }
    if (nextCard.querySelector(".age-input")) {
      initAge(nextCard);
    }
    if (nextCard.querySelector(".time-input")) {
      initTime(nextCard);
    }
    if (nextCard.querySelector(".budget")) {
      initBudget(nextCard);
    }
    if (nextCard.querySelector(".medium")) {
      intiMedium(nextCard);
    }
    if (nextCard.querySelector("#hobbies")) {
      initHobbies(nextCard);
    }
    if (nextCard.querySelector("#occasion")) {
      initOccasion(nextCard);
    }
    if (nextCard.querySelector("#additional")) {
      initExtraInfo(nextCard);
    }
  } else {
    document.querySelector(
      ".buttons"
    ).innerHTML = ` <button id="get_rec">Get Recommendation</button>`;
    const getBtn = document.getElementById("get_rec");
    getBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      document.querySelector("form").innerHTML = spinner;
      const form = JSON.parse(localStorage.getItem("rec_data"));
      const response = await fetch(
        `https://datifyer.lm.r.appspot.com/process_json`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const resData = await response.json();
      const { result } = resData;
      localStorage.setItem("new_result", JSON.stringify(result));
      localStorage.removeItem("rec_data");
      location.assign("/app/result.html");
    });
  }
}

function prevCard() {
  const currentCard = document.querySelector(`.input${currentIndex}`);
  const prevIndex = currentIndex - 1;
  const prevCard = document.querySelector(`.input${prevIndex}`);
  if (prevCard) {
    currentCard.style.transform = "translateY(300px) scale(0)";
    prevCard.style.transform = "translateY(0) scale(1)";
    currentIndex = prevIndex;
    if (nextCard.querySelector(".age-input")) {
      initAge(prevCard);
    }
    if (prevCard.querySelector(".calendar")) {
      initDate();
    }
    if (prevCard.querySelector("#location")) {
      initMap();
    }
    if (prevCard.querySelector(".time-input")) {
      initTime(prevCard);
    }
    if (prevCard.querySelector(".budget")) {
      initBudget(prevCard);
    }
    if (prevCard.querySelector(".medium")) {
      intiMedium(prevCard);
    }
  }
}

document.querySelectorAll(".next").forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    nextCardPrev();
  })
);

document.querySelectorAll(".prev").forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    prevCard();
  })
);

document.getElementById("close-form").addEventListener("click", closeForm);

function setProgress(num) {
  const bar = document.querySelector(".progress-indicator");
  bar.style.setProperty("--width", `${(num / questions.length) * 100}%`);
}

function closeForm() {
  localStorage.removeItem("rec_data");
  location.assign("/app/home.html");
}

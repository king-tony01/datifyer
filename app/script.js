let circle;
let map = null;

export function initMap() {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      const coords = [latitude, longitude];
      const data = JSON.parse(localStorage.getItem("rec_data"));
      if (data) {
        data.location = [latitude, longitude];
        localStorage.setItem("rec_data", JSON.stringify(data));
      }
      createMap(coords);
      getAddress({ longitude, latitude });
    },
    function () {
      alert("We couldn't get your location");
    }
  );

  async function getGeocodes(address) {
    // Create a URL for the Nominatim API request
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
      address
    )}`;
    console.log(address);
    try {
      // Fetch the data from the API
      const res = await fetch(url);
      const data = await res.json();
      if (data.length > 0) {
        // Get the first result
        const result = data[0];
        const { lat, lon } = result;
        return { latitude: lat, longitude: lon };
      } else {
        console.log("No results found");
      }
    } catch (err) {
      console.log(`Error occured while fetching data: ${err}`);
    }
  }

  function createMap(coords) {
    if (map) {
      map.remove();
    }
    map = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    circle = L.circle(coords, {
      color: "#fe5e2c",
      fillColor: "#fe5e2c",
      fillOpacity: 0.2,
      radius: 1000,
    })
      .addTo(map)
      .bindPopup("Distance in KM.<br> Maximum range for recommendations")
      .openPopup();
  }

  function updateRange(e, circle) {
    const rangeinput = +e.target.value;
    circle.setRadius(rangeinput * 1000);
    const data = JSON.parse(localStorage.getItem("rec_data"));
    if (data) {
      data.range = `${rangeinput}KM`;
      localStorage.setItem("rec_data", JSON.stringify(data));
    }
  }

  const range = document.getElementById("range");
  range.addEventListener("input", (e) => updateRange(e, circle));

  const locationinput = document.getElementById("location");
  locationinput.addEventListener(
    "input",
    debounce(async () => {
      const { latitude, longitude } = await getGeocodes(locationinput.value);
      createMap([+latitude, +longitude]);
      const data = JSON.parse(localStorage.getItem("rec_data"));
      if (data) {
        data.location = [+latitude, +longitude];
        localStorage.setItem("rec_data", JSON.stringify(data));
      }
    }, 3000)
  );

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  function getAddress({ longitude, latitude }) {
    // Create a URL for the Nominatim API request
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.address) {
          document.getElementById("location").value = data.display_name;
        } else {
          console.log("No results found");
        }
      })
      .catch((error) => {
        console.error("Error fetching reverse geocoding data:", error);
      });
  }
}

export function initDate({ year, month, date }) {
  let now = `${month} ${date} ${year}`;
  const data = JSON.parse(localStorage.getItem("rec_data"));
  if (data) {
    data.date_of_date = now;
    localStorage.setItem("rec_data", JSON.stringify(data));
  }
  const dates = document.querySelectorAll(".date-input");
  dates.forEach((date) =>
    date.addEventListener("click", () => {
      dates.forEach((date) => date.classList.remove("active"));
      date.classList.add("active");
      console.log(+date.textContent);
      now = `${month} ${+date.textContent} ${year}`;
      const data = JSON.parse(localStorage.getItem("rec_data"));
      if (data) {
        data.date_of_date = now;
        localStorage.setItem("rec_data", JSON.stringify(data));
      }
    })
  );
}

export function initAge(card) {
  const ages = document.querySelectorAll(".age-input");
  const checks = card.querySelectorAll(".check-mark");
  const data = JSON.parse(localStorage.getItem("rec_data"));
  if (data) {
    data.age_of_date = document
      .querySelector(".age-input.active")
      .textContent.trim();
    localStorage.setItem("rec_data", JSON.stringify(data));
  }
  ages.forEach((age, k) => {
    age.addEventListener("click", () => {
      ages.forEach((a) => a.classList.remove("active"));
      age.classList.add("active");
      checks.forEach((c) => c.classList.remove("active"));
      checks[k].classList.add("active");
      const data = JSON.parse(localStorage.getItem("rec_data"));
      if (data) {
        data.age_of_date = age.textContent.trim();
        localStorage.setItem("rec_data", JSON.stringify(data));
      }
    });
  });
}

export function initTime(card) {
  const times = document.querySelectorAll(".time-input");
  const checks = card.querySelectorAll(".check-mark");
  const data = JSON.parse(localStorage.getItem("rec_data"));
  if (data) {
    data.time_of_date = document
      .querySelector(".time-input.active")
      .textContent.trim();
    localStorage.setItem("rec_data", JSON.stringify(data));
  }
  times.forEach((time, k) => {
    time.addEventListener("click", () => {
      times.forEach((t) => t.classList.remove("active"));
      time.classList.add("active");
      checks.forEach((c) => c.classList.remove("active"));
      checks[k].classList.add("active");
      const data = JSON.parse(localStorage.getItem("rec_data"));
      if (data) {
        data.time_of_date = time.textContent.trim();
        localStorage.setItem("rec_data", JSON.stringify(data));
      }
    });
  });
}

export function initBudget(card) {
  const budgets = document.querySelectorAll(".budget");
  const checks = card.querySelectorAll(".check-mark");
  const data = JSON.parse(localStorage.getItem("rec_data"));
  if (data) {
    data.budget = document.querySelector(".budget.active").textContent.trim();
    localStorage.setItem("rec_data", JSON.stringify(data));
  }
  budgets.forEach((budget, k) => {
    budget.addEventListener("click", () => {
      budgets.forEach((b) => b.classList.remove("active"));
      budget.classList.add("active");
      checks.forEach((c) => c.classList.remove("active"));
      checks[k].classList.add("active");
      const data = JSON.parse(localStorage.getItem("rec_data"));
      if (data) {
        data.budget = budget.textContent.trim();
        localStorage.setItem("rec_data", JSON.stringify(data));
      }
    });
  });
}

export function intiMedium(card) {
  const mediums = document.querySelectorAll(".medium");
  const checks = card.querySelectorAll(".check-mark");
  const data = JSON.parse(localStorage.getItem("rec_data"));
  if (data) {
    data.indoor_or_outdoor_activities_preference = document
      .querySelector(".medium.active")
      .textContent.trim();
    localStorage.setItem("rec_data", JSON.stringify(data));
  }
  mediums.forEach((medium, k) => {
    medium.addEventListener("click", () => {
      mediums.forEach((m) => m.classList.remove("active"));
      medium.classList.add("active");
      const data = JSON.parse(localStorage.getItem("rec_data"));
      if (data) {
        data.indoor_or_outdoor_activities_preference =
          medium.textContent.trim();
        localStorage.setItem("rec_data", JSON.stringify(data));
      }
      checks.forEach((c) => c.classList.remove("active"));
      checks[k].classList.add("active");
    });
  });
}

export function initHobbies(card) {
  const input = card.querySelector("#hobbies");
  const list = card.querySelector("#hobbies-list");

  let hobbies = [];
  input.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      list.insertAdjacentHTML(
        "beforeend",
        `<li>${input.value} <i class="fas fa-close"></i></li>`
      );
      hobbies.push(input.value.trim());
      const data = JSON.parse(localStorage.getItem("rec_data"));
      if (data) {
        data.date_interest_or_hobbies = hobbies;
        localStorage.setItem("rec_data", JSON.stringify(data));
      }
      input.value = "";
    }
    document.querySelectorAll(".fa-close").forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log(btn.parentElement.textContent);
        deleteItem(btn.parentElement);
        hobbies = hobbies.filter(
          (item) => item !== btn.parentElement.textContent
        );
        const data = JSON.parse(localStorage.getItem("rec_data"));
        if (data) {
          data.date_interest_or_hobbies = hobbies;
          localStorage.setItem("rec_data", JSON.stringify(data));
        }
      });
    });
  });
}

function deleteItem(item) {
  item.remove();
}

export function initOccasion(card) {
  const input = card.querySelector("#occasion");
  input.addEventListener("input", () => {
    const data = JSON.parse(localStorage.getItem("rec_data"));
    if (data) {
      data.occasion = input.value;
      localStorage.setItem("rec_data", JSON.stringify(data));
    }
  });
}

export function initExtraInfo(card) {
  const input = card.querySelector("#additional");
  input.addEventListener("input", (e) => {
    const data = JSON.parse(localStorage.getItem("rec_data"));
    if (data) {
      data.extra_info_about_this_date = input.value;
      localStorage.setItem("rec_data", JSON.stringify(data));
    }
  });
}

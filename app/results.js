import { marked } from "marked";
const currentVIew = document.querySelector(".current-result");
const data = JSON.parse(localStorage.getItem("new_result"));
const newBtn = document.getElementById("new-rec");

newBtn.addEventListener("click", () => {
  location.assign("/app/home.html");
});

const recent = JSON.parse(localStorage.getItem("recent_recommendations"));
const listContianer = document.getElementById("recent-list");
if (recent) {
  const newResult = {
    id: new Date(),
    data: data,
  };
  const exist = recent.some((item) => deepEqual(item.data, newResult.data));

  if (!exist) {
    recent.push(newResult);
    localStorage.setItem("recent_recommendations", JSON.stringify(recent));
  }
  if (recent && recent.length > 0) {
    listContianer.innerHTML = recent
      .map((item, i) => {
        const image = new Image();
        image.src = "data:image/png;base64," + item.data[0][0][0];
        return `<li class="recent-date-tab" id="${i}">
              <img src="${image.src}" alt="" />
              <div class="wrap">
                <strong>${item.data[0][6]}</strong>
                <div class="rating">
                  <small>${stars(item.data[0][3])}</small>
                  <small>${item.data[0][3]}</small>
                </div>
                <i class="fas fa-ellipsis-h"></i>
              </div>
            </li>`;
      })
      .join(" ");
    activateTabs(recent);
  } else {
    listContianer.innerHTML = ` <div class="noting">
              <i class="fas fa-inbox"></i>
              <p>No recent recommendation</p>
            </div>`;
  }
} else {
  const recentList = [];
  const newResult = {
    id: new Date(),
    data: data,
  };
  recentList.push(newResult);
  localStorage.setItem("recent_recommendations", JSON.stringify(recentList));
  listContianer.innerHTML = recentList
    .map((item, i) => {
      console.log(item);
      const image = new Image();
      image.src = "data:image/png;base64," + item.data[0][0][0];
      return `<li class="recent-date-tab" id="${i}">
              <img src="${image.src}" alt="" />
              <div class="wrap">
                <strong>${item.data[0][6]}</strong>
                <div class="rating">
                   <small>${stars(item.data[0][3])}</small>
                  <small>${item.data[0][3]}</small>
                </div>
                <i class="fas fa-ellipsis-h"></i>
              </div>
            </li>`;
    })
    .join(" ");
  activateTabs([newResult]);
}

const firstImage = new Image();
const secondImage = new Image();
firstImage.src = "data:image/png;base64," + data[0][0][0];
secondImage.src = "data:image/png;base64," + data[0][0][1];
function markdownToHTML(markdown) {
  return marked(markdown);
}

currentVIew.innerHTML = `<div class="full-view">
                <div class="result-images">
                  <img src="${firstImage.src}" alt="" />
                  <img src="${secondImage.src}" alt="" />
                </div>
                <strong>${data[0][6]}</strong>
                <small
                  >${data[0][2]}</small
                >
                <div class="desc-wrap">
                  <small id="description-title">Description</small>
                <small
                  >${data[0][8].text}</small
                >
                <a href="tel:${data[0][1]}">${data[0][1]}</a>
                <a href="${data[0][4]}" target="_blank">Visit website</a>
                </div>
                <div class="stars">
                  ${stars(data[0][3])}  ${data[0][3]}
                </div>
                <div class="desc">
                  ${markdownToHTML(data[0][9])}
                </div>
                <div class="actions">
                  
                </div>
                <h3>Reviews</h3>
                <div class="reviews-con">
                ${data[0][7]
                  .map((user) => {
                    return ` <div class="review-card">
                    <img src="${user.authorAttribution.photoUri}" alt="" />
                    <div class="rev-grid">
                      <b>${user.authorAttribution.displayName}</b>
                      <small
                        >${user.text.text}</small
                      >
                    </div>
                  </div>`;
                  })
                  .join("")}
                </div>
                
              </div>
              <div class="result-list">
                <ul>
                  ${data
                    .map((item, i) => {
                      const image = new Image();
                      image.src = "data:image/png;base64," + item[0][0];
                      return `<li class="result-current" id="${i}">
                    <img src="${image.src}" alt="" />
                    <div>
                      <p>
                        ${item[6]}
                      </p>
                      <div class="stars">
                        ${stars(item[3])}
                      </div>
                    </div>
                  </li>`;
                    })
                    .join("")}
                </ul>
              </div>`;

function activate() {
  const list = document.querySelectorAll(".result-current");
  list.forEach((li) => {
    li.addEventListener("click", () => {
      const index = +li.id;
      const date = data.find((item, i) => i == index);
      updatView(date);
    });
  });
}

activate();

function stars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    '<i class="fas fa-star"></i>'.repeat(fullStars) +
    (halfStar ? '<i class="fas fa-star-half-alt"></i>' : "") +
    '<i class="far fa-star"></i>'.repeat(emptyStars)
  );
}

function updatView(data) {
  const imageOne = new Image();
  const imageTwo = new Image();
  imageOne.src = "data:image/png;base64," + data[0][0];
  imageTwo.src = "data:image/png;base64," + data[0][1];
  const fullView = document.querySelector(".full-view");
  fullView.innerHTML = `<div class="result-images">
                  <img src="${imageOne.src}" alt="" />
                  <img src="${imageTwo.src}" alt="" />
                </div>
                <strong>${data[6]}</strong>
                <small
                  >${data[2]}</small
                >
                <div class="desc-wrap">
                  <small id="description-title">Description</small>
                <small
                  >${data[8] ? data[8].text : "Not available"}</small
                >
                <a href="tel:${data[1]}">${data[1]}</a>
                <a href="${data[4]}" target="_blank">Visit website</a>
                </div>
                <div class="stars">
                  ${stars(data[3])}  ${data[3]}
                </div>
                <div class="desc">
                  ${markdownToHTML(data[9])}
                </div>
                <div class="actions">
                  
                </div>
                <h3>Reviews</h3>
                <div class="reviews-con">
                ${data[7]
                  .map((user) => {
                    return ` <div class="review-card">
                    <img src="${user.authorAttribution.photoUri}" alt="" />
                    <div class="rev-grid">
                      <b>${user.authorAttribution.displayName}</b>
                      <small
                        >${user.text.text}</small
                      >
                    </div>
                  </div>`;
                  })
                  .join("")}
                </div>
              `;
}

function activatePreviousDate(data) {
  currentVIew.innerHTML = `<div class="full-view">
                <div class="result-images">
                  <img src="${firstImage.src}" alt="" />
                  <img src="${secondImage.src}" alt="" />
                </div>
                <strong>${data[0][6]}</strong>
                <small
                  >${data[0][2]}</small
                >
                <div class="desc-wrap">
                  <small id="description-title">Description</small>
                <small
                  >${data[0][8].text}</small
                >
                <a href="tel:${data[0][1]}">${data[0][1]}</a>
                <a href="${data[0][4]}" target="_blank">Visit website</a>
                </div>
                <div class="stars">
                  ${stars(data[0][3])}  ${data[0][3]}
                </div>
                <div class="desc">
                  ${markdownToHTML(data[0][9])}
                </div>
                <div class="actions">
                  
                </div>
                <h3>Reviews</h3>
                <div class="reviews-con">
                ${data[0][7]
                  .map((user) => {
                    return ` <div class="review-card">
                    <img src="${user.authorAttribution.photoUri}" alt="" />
                    <div class="rev-grid">
                      <b>${user.authorAttribution.displayName}</b>
                      <small
                        >${user.text.text}</small
                      >
                    </div>
                  </div>`;
                  })
                  .join("")}
                </div>
                
              </div>
              <div class="result-list">
                <ul>
                  ${data
                    .map((item, i) => {
                      const image = new Image();
                      image.src = "data:image/png;base64," + item[0][0];
                      return `<li class="result-current" id="${i}">
                    <img src="${image.src}" alt="" />
                    <div>
                      <p>
                        ${item[6]}
                      </p>
                      <div class="stars">
                        ${stars(item[3])}
                      </div>
                    </div>
                  </li>`;
                    })
                    .join("")}
                </ul>
              </div>`;
}

function deepEqual(a, b) {
  if (a === b) return true;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (
    typeof a === "object" &&
    a !== null &&
    typeof b === "object" &&
    b !== null
  ) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (let key of keysA) {
      if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
    }
    return true;
  }

  return false;
}

function activateTabs(data) {
  console.log(`This is it`, data);
  const tabs = document.querySelectorAll(".recent-date-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const index = +tab.id;
      const current = data.find((item, i) => i == index);
      if (current) {
        const { data } = current;
        activatePreviousDate(data);
        activate();
      }
    });
  });
}

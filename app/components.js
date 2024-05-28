export function recent() {
  const listContianer = document.getElementById("recent-list");
  const list = JSON.parse(localStorage.getItem("recent_recommendations"));
  console.log(list);
  if (list && list.length > 0) {
    listContianer.innerHTML = list
      .map((item) => {
        const image = new Image();
        image.src = "data:image/jpg;base64," + item.data[0][0][0];
        return `<li class="open-recent">
              <img src="${image.src}" alt="" />
              <div class="wrap">
                <strong>${item.data[0][6]}</strong>
                <div class="rating">
                  <small><i class="fas fa-star"></i></small>
                  <small>${item.data[0][3]}</small>
                </div>
                <i class="fas fa-ellipsis-h"></i>
              </div>
            </li>`;
      })
      .join(" ");
    const btns = document.querySelectorAll(".open-recent");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        location.assign("/app/result.html");
      });
    });
  } else {
    listContianer.innerHTML = ` <div class="noting">
              <i class="fas fa-inbox"></i>
              <p>No recent recommendation</p>
            </div>`;
  }
}

export const firstQuestion = `
          <p>
            What kind of vibe do you expect from this date i.e (How would you
            classify this date).
          </p>
          <div class="first-options">
            <div class="card">
              <img src="/public/images/business.jpg" alt="" />
              <strong>Business</strong>
              <i class="fas fa-check"></i>
            </div>
            <div class="card">
              <img src="/public/images/romance.jpg" alt="" />
              <strong>Romance</strong>
              <i class="fas fa-check"></i>
            </div>
            <div class="card">
              <img src="/public/images/casual.jpg" alt="" />
              <strong>Casual Date</strong>
              <i class="fas fa-check"></i>
            </div>
            <div class="card">
              <img src="/public/images/education.jpg" alt="" />
              <strong>Educational</strong>
              <i class="fas fa-check"></i>
            </div>
            <div class="card">
              <img src="/public/images/romance.jpg" alt="" />
              <strong>Cozy and Comfortable</strong>
              <i class="fas fa-check"></i>
            </div>
            <div class="card">
              <img src="/public/images/casual.jpg" alt="" />
              <strong>Energetic and Exciting</strong>
              <i class="fas fa-check"></i>
            </div>
            <div class="card">
              <img src="/public/images/business.jpg" alt="" />
              <strong>Cultural and Intellectual</strong>
              <i class="fas fa-check"></i>
            </div>
            <div class="card">
              <img src="/public/images/business.jpg" alt="" />
              <strong>Fun and Playful</strong>
              <i class="fas fa-check"></i>
            </div>
          </div>
          <button id="continue" class="disabled" disabled>Continue</button>
    `;

/**
 * @typedef {HTMLElement} Spinner
 */
export const spinner = `<div class="loader">
      <div class="circle">
        <div class="inner-circle"></div>
      </div>
      <small>Working on it...</small>
    </div>`;

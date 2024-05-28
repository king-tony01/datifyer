import { initQuestion } from "./intiQuestion.js";

export function home() {
  document.querySelector("#app").innerHTML = `<section class="home">
      <section class="left-con hide">
        <div class="recent-con">
          <h3>Recent</h3>
          <ul id="recent-list"></ul>
        </div>
      </section>
      <section class="right-con">
        <div class="head">
          <h1><img src="/public/images/main-logo.png" alt="" /></h1>
          <button class="user-con">
            <i class="fas fa-user"></i>
            <i class="fas fa-chevron-down"></i>
          </button>
        </div>
        <div class="inner"></div>
      </section>
    </section>`;
  const recent = document.querySelector(".left-con");
  document.getElementById("new-rec").addEventListener("click", () => {
    initQuestion();
    recent.classList.add("hide");
  });
  const newBtn = document.getElementById("new-one");
  newBtn.addEventListener("click", () => {
    console.log("New one");
    location.assign("/app/home.html");
  });
  document.querySelector(".user-con").addEventListener("click", () => {});
}

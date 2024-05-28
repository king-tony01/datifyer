import { recent } from "./components.js";
import { initQuestion } from "./intiQuestion.js";

recent();
initQuestion();

const recent_con = document.querySelector(".left-con");
document.getElementById("new-rec").addEventListener("click", () => {
  initQuestion();
  recent_con.classList.add("hide");
});

document.querySelector(".user-con").addEventListener("click", () => {});

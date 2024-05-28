import { firstQuestion } from "./components.js";
export function initQuestion() {
  document.querySelector(".inner").innerHTML = firstQuestion;
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) =>
    card.addEventListener("click", () => {
      cards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      const btn = document.getElementById("continue");
      btn.classList.remove("disabled");
      btn.removeAttribute("disabled");
      btn.addEventListener("click", () => {
        location.assign(
          `/form.html?${encodeURIComponent(
            card.querySelector("strong").textContent
          )}`
        );
      });
    })
  );
}

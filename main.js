import { home } from "./components/home.js";

document.querySelector("#app").innerHTML = home();

let imgBx = document.querySelectorAll(".image-bx");
let contentBx = document.querySelectorAll(".contentBx");

for (let i = 0; i < imgBx.length; i++) {
  imgBx[i].addEventListener("mouseover", function () {
    for (let i = 0; i < contentBx.length; i++) {
      contentBx[i].className = "contentBx";
    }
    document.getElementById(this.dataset.id).className = "contentBx active";
    for (let i = 0; i < imgBx.length; i++) {
      imgBx[i].className = "image-bx";
    }
    this.className = "image-bx active";
  });
}

document.getElementById("get-rec").addEventListener("click", () => {
  location.assign("/app/home.html");
});

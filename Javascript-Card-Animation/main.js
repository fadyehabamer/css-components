let container = document.getElementById("container");
let overlay = document.getElementById("overlay");
let up = document.getElementById("up");
let cont = document.getElementById("cont");
let disc = document.getElementById("text");
container.addEventListener("mouseenter", () => {
  overlay.style.height = "100%";
  up.style.height = "100%";
  up.style.color = "white";
  cont.style.transform = "translateY(-310px)";
  disc.style.zIndex = "10000000";
  disc.style.transform = "translateY(-245px)";
  disc.style.color = "white";
});

container.addEventListener("mouseleave", () => {
  overlay.style.height = "0%";
  up.style.height = "50%";
  cont.style.transform = "translateY(0)";
  disc.style.zIndex = "10000000";
  disc.style.transform = "translateY(0)";
  disc.style.color = "black";
});

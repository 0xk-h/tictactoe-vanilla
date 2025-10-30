const cells = document.querySelectorAll(".cell");
const msg = document.querySelector("#turn");
const restart = document.querySelector("button");
let options = 9;
let winRule = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let curr = ["", "", "", "", "", "", "", "", ""];
let currplay = "X";
let running = true;
start();
function start() {
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      clicked(cell, index);
    });
  });
  restart.addEventListener("click", () => {
    reset();
  });
}
function clicked(box, i) {
  if (curr[i] || !running) {
    return;
  }
  box.innerHTML = currplay;

  curr[i] = currplay;
  options--;
  if (win()) {
    return;
  }
  if (currplay === "X") {
    currplay = "O";
  } else {
    currplay = "X";
  }
  msg.innerHTML = `${currplay}'s Turn`;
}
function win() {
  for (let i = 0; i < winRule.length; i++) {
    b1 = winRule[i][0];
    b2 = winRule[i][1];
    b3 = winRule[i][2];
    if (
      curr[b1] === curr[b2] &&
      curr[b2] === curr[b3] &&
      curr[b3] === currplay
    ) {
      msg.innerHTML = `${currplay} Won!`;
      cells[b1].style.color = "blue";
      cells[b2].style.color = "blue";
      cells[b3].style.color = "blue";
      running = false;
      return 1;
    }
  }
  if (options === 0) {
    msg.innerHTML = "Draw";
    return 1;
  }
  return 0;
}
function reset() {
  msg.innerHTML = "X's Turn";
  currplay = "X";
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.style.color = "white";
  });
  curr = ["", "", "", "", "", "", "", "", ""];
  options = 9;
  running = true;
}

window.onload = () => {
  fillBoard(0, 0);
};

const peaces = document.querySelectorAll(".peace");
let time = true;
const player_X = "X";
const player_O = "O";
let combinacaoVencedora = [];
const COMBINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const lights = [0, 2, 8, 6];
let ix = (jx = 0);
fillBoard = (ix, jx) => {
  setInterval(() => {
    if (jx < lights.length * 3) {
      highLigth(lights[ix]);
      if (ix > 0) {
        downLigth(lights[ix - 1]);
      } else {
        downLigth(lights[lights.length - 1]);
      }
      ix = ix == 3 ? 0 : ix + 1;
      jx++;
    } else {
      if (combinacaoVencedora.length == 0) downLigth(lights[lights.length - 1]);
    }
  }, 200);
};

restartGame = () => {
  time = true;
  ix = jx = 0;
  fillBoard(ix, jx);
  for (let i = 0; i < 9; i++) {
    let peace = document.getElementById(i);
    peace.classList.remove("active");
    peace.textContent = "";
    if (peace.classList.contains("X")) peace.classList.remove("X");
    else peace.classList.remove("O");
  }
  peaces.forEach((peace) => {
    peace.removeAttribute("disabled");
  });
  combinacaoVencedora = [];
  combinacaoVencedora.forEach((element) => {
    downLigth(element);
  });
  document.getElementById("winner-1").style.display = "none";
  document.getElementById("winner-2").style.display = "none";
};

getPeace = (event) => {
  play(event.target.id);
};

play = (id) => {
  let peace = document.getElementById(id);
  let player = time ? player_X : player_O;
  peace.textContent = player;
  peace.classList.add(player);
  checkWinner(player);
};

checkWinner = (player) => {
  const winner = COMBINES.some((comb) => {
    combinacaoVencedora = comb;
    return comb.every((index) => {
      return peaces[index].classList.contains(player);
    });
  });
  if (winner) {
    endGame(player);
  } else if (checkEmpate()) endGame();
  else time = !time;
};

endGame = (player = null) => {
  if (player) {
    combinacaoVencedora.forEach((element) => {
      highLigth(element);
    });
    peaces.forEach((peace) => {
      peace.setAttribute("disabled", "disabled");
    });
    let label_X = document.getElementById("winner-1");
    let label_O = document.getElementById("winner-2");
    if (player == "X") label_X.style.display = "block";
    else label_O.style.display = "block";
  } else {
    modalEmpate();
    peaces.forEach((peace) => {
      peace.setAttribute("disabled", "disabled");
    });
  }
};

checkEmpate = () => {
  let x = 0;
  let o = 0;
  for (let i in peaces) {
    if (!isNaN(i)) {
      if (peaces[i].classList.contains(player_X)) {
        x++;
      }
      if (peaces[i].classList.contains(player_O)) {
        o++;
      }
    }
  }
  return x + o == 9 ? true : false;
};

highLigth = (id) => {
  let peace = document.getElementById(id);
  peace.classList.add("active");
};

downLigth = (id) => {
  let peace = document.getElementById(id);
  peace.classList.remove("active");
};

closeModal = () => {
  let modal = document.getElementById("modal-empate");
  let overlay = document.getElementById("overlay");
  modal.style.display = "none";
  overlay.style.display = "none";
  restartGame();
};

modalEmpate = () => {
  let modal = document.getElementById("modal-empate");
  let overlay = document.getElementById("overlay");
  modal.style.display = "block";
  overlay.style.display = "block";
};

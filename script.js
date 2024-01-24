const cells = document.querySelectorAll(".cell");
const startButton = document.querySelector(".startButton");
const restartButton = document.querySelector("#restartButton");
const winningMessage = document.querySelector(".winningMessage");
const winningTextMessage = document.querySelector(".winningTextMessage");
const introduccionPantalla = document.querySelector(".introduccionPantalla");
const puntaje = document.querySelector(".puntaje")

let ultimo = "";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let contador = 0;
let contadorVictoriasj1 = 0;
let contadorVictoriasj2 = 0;
let jugador1;
let jugador2;

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.innerHTML === "") {
      if (ultimo === "circle" || ultimo === "") {
        cell.classList.add("x");
        cell.innerHTML = "X";
        ultimo = "x";
        contador += 1;
      } else if (ultimo === "x") {
        cell.classList.add("circle");
        cell.innerHTML = "O";
        ultimo = "circle";
        contador += 1;
      }
    }

    if (chequearVictoria(ultimo)) {
      winningMessage.classList.add("show");
      if (ultimo === "x") {
        winningTextMessage.innerHTML = `${jugador1} gana!`;
        contadorVictoriasj1 += 1
      } else if (ultimo === "circle") {
        winningTextMessage.innerHTML = `${jugador2} gana!`;
        contadorVictoriasj2 += 1
      }

      puntaje.innerHTML = `
      <h1>Victorias de ${jugador1}: ${contadorVictoriasj1}</h1>
      <br/>
      <h1>Victorias de ${jugador2}: ${contadorVictoriasj2}</h1>
      `
    }

    chequearEmpate();
  });
});

startButton.addEventListener("click", () => {
  introduccionPantalla.classList.remove("introduccionPantalla");
  introduccionPantalla.classList.add("dontShow");

  jugador1 = prompt("Ingrese el nombre del jugador 1");
  jugador2 = prompt("Ingrese el nombre del jugador 2");
});

restartButton.addEventListener("click", () => {
  cells.forEach((cell) => {
    contador = 0;
    cell.innerHTML = "";
    ultimo = "";
    cell.classList.remove("x");
    cell.classList.remove("circle");
    winningMessage.classList.remove("show");
  });
});

chequearVictoria = (ultimo) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(ultimo);
    });
  });
};

chequearEmpate = () => {
  if (contador === 9 && !chequearVictoria(ultimo)) {
    winningMessage.classList.add("show");
    winningTextMessage.innerHTML = "Empate, no hay ganador!";
  }
};

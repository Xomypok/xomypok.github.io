const board = document.getElementById("puzzle-board");
const piecesContainer = document.getElementById("pieces");
const resetButton = document.getElementById("reset-button");

const wsize = 3;
const hsize = 4;
const imageUrl = './image.jpg'; // относительный путь к изображению

let positions = [];

function createBoard() {
  board.innerHTML = '';
  for (let row = 0; row < hsize; row++) {
    for (let col = 0; col < wsize; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("dragover", e => e.preventDefault());
      cell.addEventListener("drop", onDrop);
      board.appendChild(cell);
    }
  }
}

function createPieces() {
  piecesContainer.innerHTML = '';
  positions = [];

  for (let row = 0; row < hsize; row++) {
    for (let col = 0; col < wsize; col++) {
      const piece = document.createElement("div");
      piece.classList.add("piece");
      piece.draggable = true;
      piece.dataset.row = row;
      piece.dataset.col = col;

      piece.style.backgroundImage = `url(${imageUrl})`;
      piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;

      piece.addEventListener("dragstart", onDragStart);
      positions.push(piece);
    }
  }

  shuffle(positions).forEach(p => piecesContainer.appendChild(p));
}

let draggedPiece = null;

function onDragStart(e) {
  draggedPiece = e.target;
}

function checkVictory() {
    const cells = document.querySelectorAll(".cell");
    for (let cell of cells) {
      const piece = cell.firstChild;
      if (!piece) return false;
  
      if (
        piece.dataset.row !== cell.dataset.row ||
        piece.dataset.col !== cell.dataset.col
      ) {
        return false;
      }
    }
    return true;
  }
  

function onDrop(e) {
    e.preventDefault();
    if (!draggedPiece) return;
  
    const dropZone = e.target;
  
    if (dropZone.classList.contains("cell") && dropZone.childNodes.length === 0) {
      dropZone.appendChild(draggedPiece);
    }
  
    draggedPiece = null;
    if (checkVictory()) {
        setTimeout(() => alert("🎉 Моя ситка правильно собрала пазл!"), 100);
      }
      
  }
  

function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

resetButton.addEventListener("click", () => {
  createBoard();
  createPieces();
});

createBoard();
createPieces();

piecesContainer.addEventListener("dragover", e => e.preventDefault());
piecesContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  if (draggedPiece) {
    piecesContainer.appendChild(draggedPiece);
    draggedPiece = null;
  }
});



const selectedCellElement = document.querySelector(".selected-cell");
const form = document.querySelector(".head-form");
let state = {};

let selectedCell = null;
let sheetCnt = 1,
  selectedSheet = "sheet1";


const defaultStyles = {
  innerText: "",
  fontFamily: "monospace",
  fontSize: 14,
  bold: false,
  italic: false,
  underline: false,
  align: "left",
  bgColor: "#faf0ff",
  textColor: "#000000",
};

function applyStylesToElement(cellElement, styleObj) {
  cellElement.innerText = styleObj.innerText;
  cellElement.style.fontFamily = styleObj.fontFamily;
  cellElement.style.fontSize = `${styleObj.fontSize}px`;
  cellElement.style.fontWeight = styleObj.bold ? "bold" : "lighter";
  cellElement.style.fontStyle = styleObj.italic ? "italic" : "normal";
  cellElement.style.textDecoration = styleObj.underline ? "underline" : "none";
  cellElement.style.textAlign = styleObj.align;
  cellElement.style.backgroundColor = styleObj.bgColor;
  cellElement.style.color = styleObj.textColor;
}

form.addEventListener("change", (e) => {
  if (selectedCell) {
    const currentCell = document.getElementById(selectedCell);

    const currentStyles = {
      innerText: currentCell.innerText,
      fontFamily: form.fontFamily.value,
      fontSize: form.fontSize.value,
      bold: form.bold.checked,
      italic: form.italic.checked,
      underline: form.underline.checked,
      align: form.align.value,
      bgColor: form.bgColor.value,
      textColor: form.textColor.value,
    };

    applyStylesToElement(currentCell, currentStyles);
    state[selectedCell] = currentStyles;
  }
});

function onCellFocus(e) {
  if (selectedCell) {
    const prevCell = document.getElementById(selectedCell);
    prevCell.classList.remove("active-cell");
  }

  selectedCell = e.target.id;
  selectedCellElement.innerText = selectedCell;
  e.target.classList.add("active-cell");

  if (!state[selectedCell]) {
    state[selectedCell] = defaultStyles;
  }
  applyCurrentStylesToForm();
}

function applyCurrentStylesToForm() {
  for (let key in state[selectedCell]) {
    form[key].type === "checkbox"
      ? (form[key].checked = state[selectedCell][key])
      : (form[key].value = state[selectedCell][key]);
  }
}

function onCellBlur() {
  const currentCell = document.getElementById(selectedCell);
  currentCell.style.overflow = "hidden";
}

const fx = document.getElementById("fx");
fx.addEventListener("keyup", (e) => {
  if (e.code === "Enter" && selectedCell) {
    const selectedElement = document.getElementById(selectedCell);
    selectedElement.innerText = eval(fx.value);
    fx.value = "";
  }
});

// to set innerText
function setInnerText() {
  const currentCell = document.getElementById(selectedCell);
  state[selectedCell].innerText = currentCell.innerText;
  fx.value = currentCell.innerText;
}

const footForm = document.querySelector(".foot-form");
footForm.addEventListener("change", (e) => {
  localStorage.setItem(selectedSheet, JSON.stringify(state));
  form.reset();
  for (let cellId in state) {
    clearData(cellId);
  }

  const newSheetName = e.target.value;
  const existingData = localStorage.getItem(newSheetName);
  if (existingData) {
    console.log(existingData);
    state = JSON.parse(existingData);
    for (let key in state) {
      const element = document.getElementById(key);
      applyStylesToElement(element, state[key]);
    }
  } else {
    state = {};
  }

  selectedSheet = newSheetName;
  selectedCell = null;
  selectedCellElement.innerText = "NA";
});

function createNewSheet() {
  sheetCnt++;

  const newSheetName = `sheet${sheetCnt}`;
  const newSheetContainer = document.createElement("div");

  newSheetContainer.innerHTML = `
  <input type="radio" name="sheet" id="${newSheetName}" value="${newSheetName}" >
  <label for="${newSheetName}">${newSheetName[0].toUpperCase()}${newSheetName.slice(
    1
  )}</label>`;

  footForm.appendChild(newSheetContainer);
}

function clearData(cellId) {
  const cell = document.getElementById(cellId);
  cell.innerText = "";
  cell.removeAttribute("style");
  cell.classList.remove("active-cell");
}

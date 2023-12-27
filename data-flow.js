const selectedCellElement = document.querySelector(".selected-cell");
const form = document.querySelector("form");
const state = {};
const defaultStyles = {
  fontFamily: "monospace",
  fontSize: 14,
  bold: false,
  italic: false,
  underline: false,
  align: "left",
  bgColor: "#ffffff",
  textColor: "#000000",
};

form.addEventListener("change", (e) => {
  const currentStyles = {
    fontFamily: form.fontFamily.value,
    fontSize: form.fontSize.value,
    bold: form.bold.checked,
    italic: form.italic.checked,
    underline: form.underline.checked,
    align: form.align.value,
    bgColor: form.bgColor.value,
    textColor: form.textColor.value,
  };

  const currentCell = document.getElementById(selectedCell);

  currentCell.style.fontFamily = currentStyles.fontFamily;
  currentCell.style.fontSize = `${currentStyles.fontSize}px`;
  currentCell.style.fontWeight = currentStyles.bold ? "bold" : "lighter";
  currentCell.style.fontStyle = currentStyles.italic ? "italic" : "none";
  currentCell.style.textDecoration = currentStyles.underline
    ? "underline"
    : "none";
  currentCell.style.textAlign = currentStyles.align;
  currentCell.style.backgroundColor = currentStyles.bgColor;
  currentCell.style.color = currentStyles.textColor;

  state[selectedCell] = currentStyles;
});

let selectedCell = null;
function onCellFocus(e) {
  selectedCell = e.target.id;
  selectedCellElement.innerText = selectedCell;

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

function onCellBlur(e) {
  const currentCell = e.target;
  e.target.style.overflow = "hidden";
}

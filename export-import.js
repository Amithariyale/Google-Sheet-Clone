document.getElementById("export").addEventListener("click", exportData);

// Function for Export file
function exportData(e) {
  let blob = new Blob([JSON.stringify(state)], { type: "text/plain" });

  let downloadLink = URL.createObjectURL(blob);

  e.target.href = downloadLink;
  e.target.download = `${selectedSheet}.json`;
}

// Function for import file

const fileInput = document.getElementById("import");

fileInput.addEventListener("change", (e) => {
  let file = e.target.files[0];

  let fileReader = new FileReader();

  fileReader.onload = function (e) {
    const extractedData = JSON.parse(e.target.result);

    for (let cell in extractedData) {
      const cellElement = document.getElementById(cell);
      state[cell] = extractedData[cell];
      applyStylesToElement(cellElement, extractedData[cell]);
    }
  };

  fileReader.readAsText(file);
});

// document.onload=function() {
//   const extractedData = localStorage.getItem(selectedCell);
//   if(extractedData){
//     state = JSON.parse(existingData);
//     for (let key in state) {
//       const element = document.getElementById(key);
//       applyStylesToElement(element, state[key]);
//     }
//   }
// };

document.getElementById("export").addEventListener("click", exportData);

function exportData(e) {
  console.log(e);
  let blob = new Blob([JSON.stringify(state)], { type: "text/plain" });

  let downloadLink = URL.createObjectURL(blob);

    e.target.href = downloadLink;
    e.target.download = `${selectedSheet}.json`;
}


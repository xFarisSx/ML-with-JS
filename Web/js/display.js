//sconst utils = require("../../common/utils");

function createRow(container, studentName, samples) {
  const row = document.createElement("div");
  row.classList.add("row");
  container.appendChild(row);

  const rowLabel = document.createElement("div");
  rowLabel.innerHTML = studentName;
  rowLabel.classList.add("rowLabel");
  row.appendChild(rowLabel);

  for (let sample of samples) {
    const { id, label, student_id } = sample;

    const sampleContainer = document.createElement("div");
    sampleContainer.id = "sample_" + id;

    sampleContainer.onclick = () => handleClick(sample, false);

    sampleContainer.classList.add("sampleContainer");

    const sampleLabel = document.createElement("div");
    sampleLabel.innerHTML = label;
    sampleContainer.appendChild(sampleLabel);

    const img = document.createElement("img");
    img.src = constants.IMG_DIR + "/" + id + ".png";
    img.classList.add("thumb");
    if (utils.flaggedUsers.includes(student_id)) {
      img.classList.add("blur");
    }
    sampleContainer.appendChild(img);
    row.appendChild(sampleContainer);
  }
}

function handleClick(sample, scroll = true) {
  [...document.querySelectorAll(".emphasize")].forEach((e) =>
    e.classList.remove("emphasize")
  );
  chart.selectSample(null);
  if (!sample) return;
  const el = document.getElementById("sample_" + sample.id);
  el.classList.add("emphasize");
  scroll
    ? el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    : null;
  chart.selectSample(sample);
}

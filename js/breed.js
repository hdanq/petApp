const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
const storeBreed = (x) => saveToStorage("breed-list", x);
const petBreed = getFromStorage("breed-list") || [];

// add or delete active
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

// function render data
const renderTableData = function (x) {
  tbody.innerHTML = "";
  for (let i = 0; i < x.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<td scope="row">${x.indexOf(x[i]) + 1}</td>
  <td>${x[i].breed}</td>
  <td>${x[i].type}</td>
  <td>
  <button type="button" class="btn btn-danger">
  Delete
  </button>
  </td>`;
    tbody.appendChild(row);
  }
  // onDelete
  const btnsDelete = document.querySelectorAll(".btn-danger");
  btnsDelete.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      petBreed.splice(i, 1);
      storeBreed(petBreed);
      renderTableData(petBreed);
    });
  });
};

renderTableData(petBreed);
// check validate
const validate = function () {
  if (typeInput.value === "Select Type" || typeInput.value === "") return false;
  if (breedInput.value === "") return false;
  return true;
};

submitBtn.addEventListener("click", function () {
  const breedData = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  if (typeInput.value === "Select Type" || typeInput.value === "") {
    removeElement("check-type");
    spanElement("type", "col-sm-3", "col-sm-3", false, "check-type");
    spanElement1("type", "Please input the type!", "col-sm-9", "check-type");
  }
  if (breedInput.value === "Select Breed" || breedInput.value === "") {
    removeElement("check-breed");
    spanElement("breed", "col-sm-3", "col-sm-3", false, "check-breed");
    spanElement1("breed", "Please input the breed!", "col-sm-9", "check-breed");
  }
  validate();

  if (validate()) {
    petBreed.push(breedData);
    renderTableData(petBreed);
    storeBreed(petBreed);
    // delete input
    typeInput.value = "";
    breedInput.value = "";
  }
});

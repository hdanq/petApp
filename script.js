const submitBtn = document.getElementById("submit-btn");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tBody = document.getElementById("tbody");
const btnHealthy = document.getElementById("healthy-btn");

const storagePet = (x) => saveToStorage("pet-list", x);
const petList = localStorage.getItem("pet-list");
const petArr = petList ? JSON.parse(petList) : [];

const validateID = function () {
  // id does not match
  for (let i = 0; i < tBody.rows.length; i++) {
    if (idInput.value === tBody.rows[i].cells[0].textContent) return false;
  }

  return true;
};

const renderTableData = function (petArr) {
  tBody.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    let vaccinatedText = petArr[i].vaccinated
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    let dewormedText = petArr[i].dewormed
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    let sterilizedText = petArr[i].sterilized
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${petArr[i].id}</th>
<td>${petArr[i].name}</td>
<td>${petArr[i].age}</td>
<td>${petArr[i].type}</td>
<td>${petArr[i].weight} kg</td>
<td>${petArr[i].length} cm</td>
<td>${petArr[i].breed}</td>
<td>
<i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
</td>
<td><i class="${vaccinatedText}"></i></td>
<td><i class="${dewormedText}"></i></td>
<td><i class="${sterilizedText}"></i></td>
<td>${petArr[i].BMI}</td>
<td>${petArr[i].date}</td>
<td>
    <button type="button" class="btn btn-danger">
    Delete
    </button>
</td>`;
    tBody.appendChild(row);
  }

  // onDelete
  function deletePet(id) {
    for (let i = 0; i < tBody.rows.length; i++) {
      if (id === tBody.rows[i].cells[0].textContent) {
        petArr.splice(i, 1);
        storagePet(petArr);
      }
      renderTableData(petArr);
    }
  }

  const btnsDelete = document.querySelectorAll(".btn-danger");

  for (let j = 0; j < btnsDelete.length; j++) {
    btnsDelete[j].addEventListener("click", function () {
      const confirmDelete = confirm("Are you sure?");
      if (confirmDelete) {
        const id = tBody.rows[j].cells[0].textContent;
        deletePet(id);
      }
    });
  }
};

renderTableData(petArr);

// get breed-list from storage

const petBreed = getFromStorage("breed-list");
const renderBreed = function (petBreed) {
  breedInput.innerHTML = "";
  console.log(breedInput);
  for (let i = 0; i < petBreed.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `${petBreed[i].breed}`;
    breedInput.appendChild(option);
  }
};

// auto change option breed by type
typeInput.addEventListener("change", function () {
  const optionsValue = petBreed.filter(function (item) {
    if (typeInput.value === "Dog") return item.type === "Dog";
    if (typeInput.value === "Cat") return item.type === "Cat";
  });
  renderBreed(optionsValue);
});

submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    BMI: "?",
    date:
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear(),
  };

  if (!idInput.value) {
    removeElement("check-id");
    spanElement("id", "col-sm-3", "col-sm-3", false, "check-id");
    spanElement1("id", "Please enter the ID!", "col-sm-9", "check-id");
  } else {
    removeElement("check-id");

    let checkID;
    const elements = document.getElementsByTagName("th");
    for (let j = 0; j < elements.length; j++) {
      const element = elements.item(j);
      if (element.getAttribute("scope") === "row")
        if (element.innerHTML === idInput.value) {
          spanElement("id", "col-sm-3", "col-sm-3", false, "check-id");
          spanElement1("id", "ID must unique!", "col-sm-9", "check-id");
          checkID = true;
        }
    }
  }
  if (!nameInput.value) {
    removeElement("check-name");
    spanElement("name", "col-sm-3", "col-sm-3", false, "check-name");
    spanElement1("name", "Please enter the name!", "col-sm-5", "check-name");
  } else {
    removeElement("check-name");
  }
  if (!ageInput.value) {
    removeElement("check-age");
    spanElement("name", "col-sm-1", "col-sm-9", ".check-name", "check-age");
    spanElement1("name", "Please enter the age!", "col-sm-3", "check-age");
  } else {
    removeElement("check-age");

    // 1 <= age <= 15
    if (ageInput.value < 1 || ageInput.value > 15) {
      spanElement("name", "col-sm-1", "col-sm-9", ".check-name", "check-age");
      spanElement1(
        "name",
        "Age must be between 1 and 15",
        "col-sm-3",
        "check-age"
      );
    }
  }
  if (typeInput.value === "Select Type" || typeInput.value === "") {
    removeElement("check-type");
    spanElement("type", "col-sm-3", "col-sm-3", false, "check-type");
    spanElement1("type", "Please select type!", "col-sm-3", "check-type");
  } else {
    removeElement("check-type");
  }
  if (breedInput.value === "Select Breed" || breedInput.value === "") {
    removeElement("check-breed");
    spanElement("color-breed", "col-sm-9", "col-sm-9", false, "check-breed");
    spanElement1(
      "color-breed",
      "Please select breed!",
      "col-sm-3",
      "check-breed"
    );
  } else {
    removeElement("check-breed");
  }
  if (!weightInput.value) {
    removeElement("check-weight");
    spanElement("weight-lenght", "col-sm-3", "col-sm-3", false, "check-weight");
    spanElement1(
      "weight-lenght",
      "Please enter the weight!",
      "col-sm-3",
      "check-weight"
    );
  } else {
    removeElement("check-weight");

    // 1 <= weight <= 15
    if (weightInput.value < 1 || weightInput.value > 15) {
      spanElement(
        "weight-lenght",
        "col-sm-3",
        "col-sm-3",
        false,
        "check-weight"
      );
      spanElement1(
        "weight-lenght",
        "Weight must be between 1 and 15!",
        "col-sm-3",
        "check-weight"
      );
    }
  }
  if (!lengthInput.value) {
    removeElement("check-lenght");
    spanElement(
      "weight-lenght",
      "col-sm-3",
      "col-sm-9",
      ".check-weight",
      "check-lenght"
    );
    spanElement1(
      "weight-lenght",
      "Please enter the lenght!",
      "col-sm-3",
      "check-lenght"
    );
  } else {
    removeElement("check-lenght");

    // 1 <= length <= 100
    if (lengthInput.value < 1 || lengthInput.value > 100) {
      spanElement(
        "weight-lenght",
        "col-sm-3",
        "col-sm-9",
        ".check-weight",
        "check-lenght"
      );
      spanElement1(
        "weight-lenght",
        "Length must be between 1 and 100!",
        "col-sm-3",
        "check-lenght"
      );
    }
  }

  // validate check
  validate();
  validateID();

  if (validate() && validateID()) {
    // fill data in arr

    petArr.push(data);
    clearInput();
    storagePet(petArr);
    // render data
    renderTableData(petArr);
  }
});

const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.innerHTML = `<option>Select Breed</option>`;
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
  tBody.value = "";
  console.log(breedInput);
};

let healthyPetArr = [];
const btnHealthyPet = document.getElementById("healthy-btn");
const healthyPet = function () {
  for (let i = 0; i < petArr.length; i++) {
    if (
      petArr[i].vaccinated === true &&
      petArr[i].dewormed === true &&
      petArr[i].sterilized === true
    ) {
      healthyPetArr.push(petArr[i]);
    }
    renderTableData(healthyPetArr);
  }
};
// show healthy pet
btnHealthyPet.addEventListener("click", function () {
  if (btnHealthyPet.textContent === "Show All Pet") {
    renderTableData(petArr);
    btnHealthyPet.textContent = "Show Healthy Pet";
  } else {
    healthyPetArr = [];
    healthyPet();
    btnHealthyPet.textContent = "Show All Pet";
  }
});

// calculate BMI pet
const btnCalBMI = document.getElementById("calculate-BMI");

function calBMI() {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type === "Dog") {
      petArr[i].BMI = (
        (petArr[i].weight * 703) /
        petArr[i].length ** 2
      ).toFixed(2);
    }
    if (petArr[i].type === "Cat") {
      petArr[i].BMI = (
        (petArr[i].weight * 886) /
        petArr[i].length ** 2
      ).toFixed(2);
    }
  }
  renderTableData(petArr);
}

btnCalBMI.addEventListener("click", calBMI);

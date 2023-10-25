const submitBtn = document.getElementById("submit-btn");

const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const form = document.getElementById("container-form");
const tBody = document.getElementById("tbody");

const storagePet = (x) => saveToStorage("pet-list", x);
const petList = localStorage.getItem("pet-list");
const petArr = petList ? JSON.parse(petList) : [];

const btnSubmitEdit = function (i) {
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

  if (validate()) {
    // fill data in arr
    petArr[i].name = nameInput.value;
    petArr[i].age = ageInput.value;
    petArr[i].type = typeInput.value;
    petArr[i].weight = weightInput.value;
    petArr[i].length = lengthInput.value;
    petArr[i].color = colorInput.value;
    petArr[i].breed = breedInput.value;
    petArr[i].vaccinated = vaccinatedInput.checked;
    petArr[i].dewormed = dewormedInput.checked;
    petArr[i].sterilized = sterilizedInput.checked;
    petArr[i].date =
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear();

    storagePet(petArr);
    renderTableData(petArr);

    form.classList.add("hide");
  }
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
    Edit
    </button>
</td>`;
    tBody.appendChild(row);
  }

  // Edit
  function startEdit(id) {
    for (let i = 0; i < tBody.rows.length; i++) {
      const copyOfPetArr = [...petArr];
      console.log("i : " + i);
      console.log("id : " + id);
      if (id === tBody.rows[i].cells[0].textContent) {
        console.log("tbody: " + tBody.rows[i].cells[0].textContent);
        // console.log("i : " + i);
        // console.log("id : " + id);
        idInput.value = copyOfPetArr[i].id;
        nameInput.value = copyOfPetArr[i].name;
        ageInput.value = copyOfPetArr[i].age;
        typeInput.value = copyOfPetArr[i].type;
        weightInput.value = copyOfPetArr[i].weight;
        lengthInput.value = copyOfPetArr[i].length;
        colorInput.value = copyOfPetArr[i].color;
        breedInput.value = copyOfPetArr[i].breed;
        vaccinatedInput.checked = copyOfPetArr[i].vaccinated;
        dewormedInput.checked = copyOfPetArr[i].dewormed;
        sterilizedInput.checked = copyOfPetArr[i].sterilized;
        // auto change option breed by type
        const optionsValue = petBreed.filter(function (item) {
          if (typeInput.value === "Dog") return item.type === "Dog";
          if (typeInput.value === "Cat") return item.type === "Cat";
          if (typeInput.value === "Select type") return [];
        });

        renderBreed(optionsValue);
        submitBtn.addEventListener("click", function () {
          btnSubmitEdit(i);
        });
      }
    }
  }

  const btnsEdit = document.querySelectorAll(".btn-danger");

  for (let j = 0; j < btnsEdit.length; j++) {
    btnsEdit[j].addEventListener("click", function (e) {
      const confirmDelete = confirm("Are you sure?");

      if (confirmDelete) {
        const id =
          e.target.parentNode.parentNode.querySelector("th").textContent;
        form.classList.remove("hide");
        startEdit(id);
      }
    });
  }
};

// get breed-list from storage
const petBreed = getFromStorage("breed-list");
const renderBreed = function (petBreed) {
  breedInput.innerHTML = "";
  for (let i = 0; i < petBreed.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${petBreed[i].breed}</option>`;
    breedInput.appendChild(option);
  }
};

renderTableData(petArr);

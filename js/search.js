const findBtn = document.getElementById("find-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tBody = document.getElementById("tbody");

const petList = localStorage.getItem("pet-list");
const petArr = petList ? JSON.parse(petList) : [];

const petID = petArr.map((item) => item.id);
const petName = petArr.map((item) => item.name);

let check = true;

petID.sort();
petName.sort();

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

<td>${petArr[i].date}</td>`;
    tBody.appendChild(row);
  }
};

renderTableData(petArr);

const suggest = function (arr, input, className) {
  removeElement("list-items");
  for (let i of arr) {
    // convert input to lowercase and compare with each string
    if (
      i.toLowerCase().includes(input.value.toLowerCase()) &&
      input.value != ""
    ) {
      // create li element

      let listItem = document.createElement("li");

      // create class name common
      listItem.classList.add("list-items");
      listItem.style.cursor = "pointer";
      listItem.style.listStyle = "none";

      let text = i.substr(0, input.value.length);
      text += i.substr(input.value.length);

      // display the value in arr
      listItem.innerHTML = text.replace(
        input.value,
        // display matched part in bold
        (match) => `<b>${match}</b>`
      );
      document.querySelector(`.${className}`).appendChild(listItem);
    }
    if (input.value === i) {
      //remove element if input = value
      removeElement("list-items");
    }
    if (input.value === "") {
      //remove element if empty
      removeElement("list-items");
    }
  }

  const len = document.querySelectorAll(".list-items");

  for (let j = 0; j < len.length; j++) {
    len[j].addEventListener("click", function (e) {
      displayNames(input, e.target.textContent);
    });
  }
};

idInput.addEventListener("keyup", function () {
  suggest(petID, idInput, "id");
});

nameInput.addEventListener("keyup", function () {
  suggest(petName, nameInput, "name");
});
function displayNames(input, idPet) {
  input.value = idPet;
  removeElement("list-items");
}

// search function

findBtn.addEventListener("click", function () {
  let searchPetArr = [...petArr]; // copy petArr

  if (idInput.value !== "") {
    searchPetArr = searchPetArr.filter((item) => {
      if (item.id.includes(idInput.value)) {
        check = false;
        return item.id.includes(idInput.value);
      }
    });
    if (check) {
      removeElement("validate");
      spanElement1(
        "container-form",
        "Pet not found",
        "text-center",
        "validate"
      );
      document.querySelector(".validate").classList.add("mb-3");
    }
  }
  if (nameInput.value !== "") {
    searchPetArr = searchPetArr.filter((item) => {
      if (item.name.includes(nameInput.value)) {
        check = false;
        return item.name.includes(nameInput.value);
      }
    });
    console.log(check);
    if (check) {
      removeElement("validate");
      spanElement1(
        "container-form",
        "Pet not found",
        "text-center",
        "validate"
      );
      document.querySelector(".validate").classList.add("mb-3");
    }
  }

  if (typeInput.value !== "Select Type") {
    searchPetArr = searchPetArr.filter((item) => {
      return item.type === typeInput.value;
    });
  }
  if (breedInput.value !== "Select Breed") {
    searchPetArr = searchPetArr.filter((item) => {
      return item.breed === breedInput.value;
    });
  }
  if (vaccinatedInput.checked) {
    searchPetArr = searchPetArr.filter((item) => {
      return item.vaccinated === true;
    });
  }
  if (dewormedInput.checked) {
    searchPetArr = searchPetArr.filter((item) => {
      return item.dewormed === true;
    });
  }
  if (sterilizedInput.checked) {
    searchPetArr = searchPetArr.filter((item) => {
      return item.sterilized === true;
    });
  }

  renderTableData(searchPetArr);
});

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

// auto change option breed by type
typeInput.addEventListener("change", function () {
  const optionsValue = petBreed.filter(function (item) {
    if (typeInput.value === "Dog") return item.type === "Dog";
    if (typeInput.value === "Cat") return item.type === "Cat";
    if (typeInput.value === "Select type") return [];
  });

  renderBreed(optionsValue);
});

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");

const validate = function () {
  // No fields were entered with missing data
  if (!idInput.value) return false;
  if (!nameInput.value) return false;
  if (!ageInput.value) return false;
  if (!weightInput.value) return false;
  if (!lengthInput.value) return false;
  if (!colorInput.value) return false;
  if (typeInput.value === "Select Type" || typeInput.value === "") return false;
  if (breedInput.value === "Select Breed" || breedInput.value === "")
    return false;
  if (ageInput.value < 1 || ageInput.value > 15) return false; // 1 <= age <= 15
  if (weightInput.value < 1 || weightInput.value > 15) return false; // 1 <= weight <= 15
  if (lengthInput.value < 1 || lengthInput.value > 100) return false; // 1 <= length <= 100
  return true;
};

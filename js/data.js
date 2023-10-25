const petList = localStorage.getItem("pet-list");
const petArr = petList ? JSON.parse(petList) : [];
const storagePet = (x) => saveToStorage("pet-list", x);

const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");
const file = document.getElementById("input-file");

// event export
exportBtn.addEventListener("click", function () {
  console.log(JSON.stringify(petArr));

  let myBlob = new Blob([JSON.stringify(petArr)], {
    type: "JSON/plain",
  });

  saveAs(myBlob, "dataPet.json");
});

// event import
importBtn.addEventListener("click", function (e) {
  let readFile = new FileReader();
  if (file.files[0]) {
    readFile.readAsText(file.files[0], "UTF-8");
    readFile.onload = function (evet) {
      //check for empty files
      if (evet.target.result) {
        // get the data in the file into a new array
        const newArr = JSON.parse(evet.target.result);

        //check for empty files
        if (newArr.length === 0) {
          removeElement("check-read-error");
          spanElement(
            "read-error",
            "col-sm-3",
            "col-sm-3",
            false,
            "check-read-error"
          );
          spanElement1(
            "read-error",
            "You can't import emty file",
            "col-sm-9",
            "check-read-error"
          );
          file.value = "";
        }

        if (petArr.length === 0) {
          storagePet(newArr);
          removeElement("check-read-error");
          spanElement(
            "read-error",
            "col-sm-3",
            "col-sm-3",
            false,
            "check-read-error"
          );
          spanElement1(
            "read-error",
            "File upload successful",
            "col-sm-9",
            "check-read-error"
          );
          // change color
          const changeStyle = document.querySelectorAll(".check-read-error");
          changeStyle[1].style.color = "#5c940d";
          file.value = "";
        } else {
          //check id if same then overwrite
          const newPet = newArr.filter(function (current) {
            for (let i = 0; i < newArr.length; i++) {
              if (current.id === petArr[i].id) {
                return (petArr[i] = current);
              } else {
                return (petArr[i] = current);
              }
            }
          });

          storagePet(newPet);
          removeElement("check-read-error");
          spanElement(
            "read-error",
            "col-sm-3",
            "col-sm-3",
            false,
            "check-read-error"
          );
          spanElement1(
            "read-error",
            "File upload successful",
            "col-sm-9",
            "check-read-error"
          );
          // change color
          const changeStyle = document.querySelectorAll(".check-read-error");
          changeStyle[1].style.color = "#5c940d";
          file.value = "";
        }
      } else {
        removeElement("check-read-error");
        spanElement(
          "read-error",
          "col-sm-3",
          "col-sm-3",
          false,
          "check-read-error"
        );
        spanElement1(
          "read-error",
          "You can't import emty file",
          "col-sm-9",
          "check-read-error"
        );
      }
    };
  } else {
    removeElement("check-read-error");
    spanElement(
      "read-error",
      "col-sm-3",
      "col-sm-3",
      false,
      "check-read-error"
    );
    spanElement1(
      "read-error",
      "You need select the file to import",
      "col-sm-9",
      "check-read-error"
    );
  }
});

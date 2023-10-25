// add new span element
function spanElement(id, valueA, ValueB, checkTrue, classNew) {
  let spanElement = document.createElement("span");
  if (document.querySelector(checkTrue)) {
    spanElement.classList.add(valueA);
  } else {
    spanElement.classList.add(ValueB);
  }
  spanElement.classList.add(classNew);
  document.getElementById(id).appendChild(spanElement);
}

function spanElement1(id, content, valueA, classNew) {
  let spanElement = document.createElement("span");
  spanElement.innerHTML = content;
  spanElement.classList.add(valueA);
  spanElement.classList.add("ps-4");
  spanElement.classList.add("pt-2");
  spanElement.classList.add(classNew);

  spanElement.style.color = "#e03131";
  if (valueA === "text-center") {
    spanElement.style.fontSize = "18px";
    document.getElementById(id).prepend(spanElement);
  } else {
    spanElement.style.fontSize = "12px";
    document.getElementById(id).appendChild(spanElement);
  }
}

// remove element
const removeElement = function (e) {
  const removeEL = document.getElementsByClassName(`${e}`);
  for (let i = 0, len = removeEL.length; i < len; i++) {
    removeEL[0].remove();
  }
};

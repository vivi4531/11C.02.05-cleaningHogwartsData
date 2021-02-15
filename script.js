"use strict";

window.addEventListener("DOMContentLoaded", start);

//Animal array
const allStudents = [];

function start() {
  console.log("ready");

  loadJSON();
}

//Loading JSON
function loadJSON() {
  const link = "https://petlatkea.dk/2021/hogwarts/students.json";
  fetch(link)
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    // TODO: Create new object with cleaned data - and store that in the allAnimals array
    //Creating empty template for objects
    const studentTemplate = {
      firstName: "-unknown-",
      lastName: "-unknown-",
      middleName: "-unknown-",
      nickName: "null",
      photo: "",
      house: "",
    };

    //Defining the splitFullName using split() from JSON
    let fullName = jsonObject.fullname.toLowerCase().trim();
    const house = jsonObject.house.toLowerCase().trim();
    const splitFullName = fullName.split(" ");
    const firstSpace = fullName.indexOf(" ");
    const lastSpace = fullName.lastIndexOf(" ");
    const firstQ = fullName.indexOf('"');
    const lastQ = fullName.lastIndexOf('"');
    //Creating animal and making animal into an object

    const student = Object.create(studentTemplate);
    let HyphenOrSpace = false;
    let result = "";
    for (let index = 0; index < fullName.length; index++) {
      if (HyphenOrSpace === true) {
        result += fullName[index].toUpperCase();
      } else {
        result += fullName[index];
      }

      if (fullName[index] === "-" || fullName[index] === " " || fullName[index] === '"') {
        HyphenOrSpace = true;
      } else {
        HyphenOrSpace = false;
      }
    }
    fullName = result;
    //defining animal name using split and calling the index we need
    student.firstName = splitFullName[0].substring(0, 1).toUpperCase() + splitFullName[0].substring(1);
    student.lastName = fullName.substring(lastSpace).trim();
    student.middleName = fullName.substring(firstSpace + 1, lastSpace).trim();

    let index = 0;
    if (student.middleName[index] === '"') {
      student.nickName = student.middleName;
      student.middleName = "";
    } else if (student.middleName === "") {
      student.middleName = "null";
    } else {
      student.nickName = "null";
    }
    // student.photo = jsonObject.age;

    student.house = house.substring(0, 1).toUpperCase() + house.substring(1);

    //Not able to remove first name

    //Combining array and adding (pushing) animal into it
    allStudents.push(student);
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allStudents.forEach(displayStudent);
}

function displayStudent(student) {
  // create clone
  const clone = document.querySelector("template#student").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=firstname]").textContent = student.firstName;
  clone.querySelector("[data-field=lastname]").textContent = student.lastName;
  clone.querySelector("[data-field=middlename]").textContent = student.middleName;
  clone.querySelector("[data-field=nickname]").textContent = student.nickName;
  //Dummypicture "./images/" + name/house + ".png"
  clone.querySelector("#profile").src = "./images/" + student.lastName.toLowerCase() + "_" + student.firstName.substring(0, 1).toLowerCase() + ".png";
  clone.querySelector("[data-field=house]").textContent = student.house;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}

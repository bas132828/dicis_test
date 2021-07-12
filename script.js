"use strict";
const btn = document.querySelector(".btn");
const form = document.getElementById("form");
//need this for setting cookies expiration date for tomorrow
const date = new Date(Date.now() + 86400e3).toUTCString();

//checking if we get some cookies to render
function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const arr = ["surname", "name", "patronomic", "date", "place", "passport"];

arr.forEach((el) => {
  //assigning the value of the cookie if we get one
  getCookie(el)
    ? (document.querySelector(`.${el}`).value = getCookie(el)
        .split(",")[0]
        .slice(0, -3))
    : //assigning empty string otherwise
      (document.querySelector(`.${el}`).value = "");
});

const cookieSetter = (key, val) => {
  document.cookie = `${key}=${val}` + date;
};

const formSubmission = (e) => {
  const surname = document.querySelector(".surname");
  const name = document.querySelector(".name");
  const patronomic = document.querySelector(".patronomic");
  const date = document.querySelector(".date");
  const place = document.querySelector(".place");
  const passport = document.querySelector(".passport");
  e.preventDefault();
  //setting user ready for JSON.stringify
  const user = {
    surname: surname.value.trim(),
    name: name.value.trim(),
    patronomic: patronomic.value.trim(),
    date: date.value,
    place: place.value.trim(),
    passport: passport.value.trim(),
  };
  // using Map to loop over user props
  const userMap = new Map(Object.entries(user));
  userMap.forEach((value, key) => {
    cookieSetter(key, value);
  });
  //clearing the fields
  arr.forEach(el=> document.querySelector(`.${el}`).value ='')
  //useing setTimeout for clearing async (not waiting for alert window to be clicked)
  setTimeout(() => {
    alert(`form is submitted, JSON file shown in console now`)
  }, 0); 
  return console.log(JSON.stringify(user));
};

form.addEventListener("submit", formSubmission);

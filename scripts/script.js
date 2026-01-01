"use strict";
const greeting = "Hello from TypeScript!";
console.log(greeting);
const btn = document.querySelector("#myBtn");
btn?.addEventListener("click", () => alert("Button clicked!"));

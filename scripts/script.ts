const greeting: string = "Hello from TypeScript!";
console.log(greeting);

const btn = document.querySelector<HTMLButtonElement>("#myBtn");
btn?.addEventListener("click", () => alert("Button clicked!"));

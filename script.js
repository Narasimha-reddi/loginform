const authForm = document.getElementById("authForm");
const toggleText = document.getElementById("toggleText");
const toggleButton = document.getElementById("toggleButton");
const message = document.getElementById("message");
let isRegistering = true;

toggleButton.addEventListener("click", () => {
    isRegistering = !isRegistering;
    formTitle.textContent = isRegistering ? "Register" : "Login";
    authForm.querySelector("button").textContent = isRegistering ? "Register" : "Login";
    toggleText.textContent = isRegistering ? "Already have an account?" : "Don't have an account?";
    toggleButton.textContent = isRegistering ? "Login" : "Register";
    message.textContent = "";
});

authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (isRegistering) {
        if (localStorage.getItem(username)) {
            message.textContent = "Username already exists!";
        } else {
            localStorage.setItem(username, password);
            message.textContent = "Registration successful!";
            message.classList.replace("text-red-500", "text-green-500");
        }
    } else {
        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            message.textContent = "Login successful!";
            message.classList.replace("text-red-500", "text-green-500");
        } else {
            message.textContent = "Login Unsuccessful";
        }
    }
    authForm.reset();
});
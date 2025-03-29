<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auth Form</title>
    <script>
        const authForm = document.getElementById("authForm");
        const toggleText = document.getElementById("toggleText");
        const toggleButton = document.getElementById("toggleButton");
        const message = document.getElementById("message");
        const formTitle = document.getElementById("formTitle");

        let isRegistering = true;

        toggleButton.addEventListener("click", () => {
            isRegistering = !isRegistering;
            formTitle.textContent = isRegistering ? "Register" : "Login";
            authForm.querySelector("button").textContent = isRegistering ? "Register" : "Login";
            toggleText.textContent = isRegistering ? "Already have an account?" : "Don't have an account?";
            toggleButton.textContent = isRegistering ? "Login" : "Register";
            message.textContent = "";
            message.classList.remove("text-green-500", "text-red-500");
        });

        async function hashPassword(password) {
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            const hashBuffer = await crypto.subtle.digest("SHA-256", data);
            return Array.from(new Uint8Array(hashBuffer))
                .map(byte => byte.toString(16).padStart(2, "0"))
                .join("");
        }

        authForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (!username || !password) {
                message.textContent = "Please fill in all fields.";
                message.classList.add("text-red-500");
                return;
            }

            if (isRegistering) {
                if (localStorage.getItem(username)) {
                    message.textContent = "Username already exists!";
                    message.classList.add("text-red-500");
                } else {
                    const hashedPassword = await hashPassword(password);
                    localStorage.setItem(username, hashedPassword);
                    message.textContent = "Registration successful!";
                    message.classList.replace("text-red-500", "text-green-500");
                }
            } else {
                const storedHashedPassword = localStorage.getItem(username);
                const hashedPassword = await hashPassword(password);
                
                if (storedHashedPassword && storedHashedPassword === hashedPassword) {
                    message.textContent = "Login successful!";
                    message.classList.replace("text-red-500", "text-green-500");
                } else {
                    message.textContent = "Login unsuccessful!";
                    message.classList.add("text-red-500");
                }
            }
            authForm.reset();
        });
    </script>
</head>
<body>
    <h2 id="formTitle">Register</h2>
    <form id="authForm">
        <input type="text" id="username" placeholder="Username" required>
        <input type="password" id="password" placeholder="Password" required>
        <button type="submit">Register</button>
    </form>
    <p id="toggleText">Already have an account? <button id="toggleButton">Login</button></p>
    <p id="message" class="text-red-500"></p>
</body>
</html>

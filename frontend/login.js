const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {

            // Save JWT token
            localStorage.setItem("token", data.token);

            message.style.color = "green";
            message.textContent = "Login successful! Redirecting...";

            setTimeout(() => {
                window.location.href = "booking.html";
            }, 1000);

        } else {

            message.style.color = "red";
            message.textContent = data.message;

        }

    } catch (error) {

        console.error(error);

        message.style.color = "red";
        message.textContent = "Unable to connect to server.";

    }
});
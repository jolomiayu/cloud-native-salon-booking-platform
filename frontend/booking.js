const bookingForm = document.getElementById("bookingForm");
const message = document.getElementById("message");

// Get JWT token
const token = localStorage.getItem("token");

// Redirect to login if not authenticated
if (!token) {
    window.location.href = "login.html";
}

bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const customer = document.getElementById("customer").value.trim();
    const service = document.getElementById("service").value.trim();
    const booking_date = document.getElementById("booking_date").value;
    const booking_time = document.getElementById("booking_time").value;

    try {
        const response = await fetch("/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Bearer ${token}
            },
            body: JSON.stringify({
                customer,
                service,
                booking_date,
                booking_time
            })
        });

        const data = await response.json();

        if (response.ok) {
            message.style.color = "green";
            message.textContent = data.message;

            bookingForm.reset();

        } else {
            message.style.color = "red";
            message.textContent = data.message || "Booking failed.";
        }

    } catch (error) {
        console.error(error);

        message.style.color = "red";
        message.textContent = "Unable to connect to server.";
    }
});

// Logout
document.getElementById("logout").addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("token");

    window.location.href = "login.html";
});
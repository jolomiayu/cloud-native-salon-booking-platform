document.addEventListener("DOMContentLoaded", () => {

    const bookBtn = document.getElementById("bookBtn");

    if (!bookBtn) return;

    bookBtn.addEventListener("click", () => {

        const token = localStorage.getItem("token");

        if (token) {
            window.location.href = "booking.html";
        } else {

            alert("Please login or register first before booking an appointment.");

            setTimeout(() => {
                window.location.href = "login.html";
            }, 500);

        }

    });

});
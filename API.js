
document.addEventListener("DOMContentLoaded", () => {
    const loadButton = document.getElementById("loadButton");
    const userTableBody = document.querySelector("#userTable tbody");

    loadButton.addEventListener("click", async () => {
        try {
            const response = await fetch("https://reqres.in/api/users?delay=3");
            const data = await response.json();
            updateTable(data.data);
            localStorage.setItem("userData", JSON.stringify(data.data));
            setTimeout(() => {
                localStorage.removeItem("userData");
            }, 60000);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    });

    const storedData = localStorage.getItem("userData");
    if (storedData) {
        updateTable(JSON.parse(storedData));
    }

    function updateTable(users) {
        userTableBody.innerHTML = "";

        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.first_name} ${user.last_name}</td>
                <td>${user.email}</td>
                <td><img src="${user.avatar}" alt="Avatar" class="rounded-circle" style="width: 40px;"></td>
            `;
            userTableBody.appendChild(row);
        });
    }
});

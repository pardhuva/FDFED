let loginData = {}; // Store user login info after successful login

document.getElementById("login-button").addEventListener("click", async (event) => {
    event.preventDefault();

    const username = document.getElementById("name").value;
    const accountNumber = parseInt(document.getElementById("account-number").value);
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, accountNumber, password })
        });

        const result = await response.json();
        if (response.ok) {
           
            loginData = { username, accountNumber, password }; // store for further use
            window.location.href = "/homepage";
        } else {
            console.log("Login failed: " + result.message);
        }
    } catch (error) {
        console.log("Error", error);
    }
});

document.getElementById("deposit").addEventListener("click", async () => {
    const amount = parseFloat(document.getElementById("amount").value);

    try {
        const response = await fetch("/deposit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...loginData, amount })
        });

        const result = await response.json();
        if (response.ok) {
            console.log(`${amount} deposited. New Balance: ${result.newBalance}`);
        } else {
            console.log("Deposit failed: " + result.message);
        }
    } catch (error) {
        console.log("Error", error);
    }
});

document.getElementById("withdraw").addEventListener("click", async () => {
    const amount = parseFloat(document.getElementById("amount").value);

    try {
        const response = await fetch("/withdraw", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...loginData, amount })
        });

        const result = await response.json();
        if (response.ok) {
            console.log(`${amount} withdrawn. New Balance: ${result.newBalance}`);
        } else {
            console.log("Withdraw failed: " + result.message);
        }
    } catch (error) {
        console.log("Error", error);
    }
});

document.getElementById("total-amount").addEventListener("click", async () => {
    try {
        const response = await fetch("/balance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();
        if (response.ok) {
            console.log(`Current balance: ₹${result.balance}`);
        } else {
            console.log("Check balance failed: " + result.message);
        }
    } catch (error) {
        console.log("Error", error);
    }
});
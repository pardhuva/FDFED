// Check login (simple front-end check)
if (localStorage.getItem('bank_logged_in') !== 'true') {
    window.location.href = "login.html";
}

let balance = Number(localStorage.getItem('bank_balance') || 0);
let history = JSON.parse(localStorage.getItem('bank_history') || "[]");

const amountInput = document.getElementById("input-amount");
const depositBtn = document.getElementById("deposit");
const withdrawBtn = document.getElementById("withdraw");
const balanceSpan = document.getElementById("balance");
const historyUl = document.getElementById("history");
const messageDiv = document.getElementById("message");

function updateBalance() {
    balanceSpan.textContent = balance;
    localStorage.setItem('bank_balance', balance);
}

function updateHistory() {
    historyUl.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyUl.appendChild(li);
    });
    localStorage.setItem('bank_history', JSON.stringify(history));
}

function showMessage(msg, isError = false) {
    messageDiv.textContent = msg;
    messageDiv.style.color = isError ? 'red' : 'green';
}

depositBtn.addEventListener('click', function() {
    const amount = Number(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        showMessage('Enter a valid amount to deposit.', true);
        return;
    }
    balance += amount;
    history.push(`Deposited: ₹${amount}`);
    updateBalance();
    updateHistory();
    showMessage('Deposit successful!');
    amountInput.value = '';
});

withdrawBtn.addEventListener('click', function() {
    const amount = Number(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        showMessage('Enter a valid amount to withdraw.', true);
        return;
    }
    if (amount > balance) {
        showMessage('Insufficient balance.', true);
        return;
    }
    balance -= amount;
    history.push(`Withdrew: ₹${amount}`);
    updateBalance();
    updateHistory();
    showMessage('Withdrawal successful!');
    amountInput.value = '';
});

// Initialize UI
updateBalance();
updateHistory();

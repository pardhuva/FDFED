let balance = 0;
let transactionHistory = [];

function deposit() {
  const amountInput = document.getElementById("amount");
  const amount = parseFloat(amountInput.value);

  clearMessage();

  if (isNaN(amount) || amount <= 0) {
    showMessage("❌ Please enter a valid amount to deposit.", "error");
    return;
  }

  balance += amount;
  transactionHistory.push(`Deposited: $${amount}`);
  updateUI();
  showMessage(`✅ Successfully deposited $${amount}.`, "success");

  amountInput.value = '';
}

function withdraw() {
  const amountInput = document.getElementById("amount");
  const amount = parseFloat(amountInput.value);

  clearMessage();

  if (isNaN(amount) || amount <= 0) {
    showMessage("❌ Please enter a valid amount to withdraw.", "error");
    return;
  }

  if (amount > balance) {
    showMessage(`❌ Insufficient funds. Available balance: $${balance}`, "error");
    return;
  }

  balance -= amount;
  transactionHistory.push(`Withdrew: $${amount}`);
  updateUI();
  showMessage(`✅ Successfully withdrew $${amount}.`, "success");

  amountInput.value = '';
}

function updateUI() {
  document.getElementById("balance").textContent = balance.toFixed(2);

  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  transactionHistory.forEach((transaction) => {
    const li = document.createElement("li");
    li.textContent = transaction;
    historyList.appendChild(li);
  });
}

function showMessage(msg, type) {
  const msgBox = document.getElementById("message");
  msgBox.textContent = msg;
  msgBox.className = type;
}

function clearMessage() {
  const msgBox = document.getElementById("message");
  msgBox.textContent = '';
  msgBox.className = '';
}

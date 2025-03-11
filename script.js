let balance = 100; // Saldo inicial
updateBalance();

function updateBalance() {
  document.getElementById("balance").innerText = `R$ ${balance.toFixed(2)}`;
}

function deposit() {
  let amount = parseFloat(document.getElementById("amount").value);

  if (isNaN(amount) || amount <= 0) {
    alert("Digite um valor válido para depósito!");
    return;
  }

  balance += amount;
  updateBalance();
  addTransaction(`Depósito de R$ ${amount.toFixed(2)}`);
  document.getElementById("amount").value = "";
}

function withdraw() {
  let amount = parseFloat(document.getElementById("amount").value);

  if (isNaN(amount) || amount <= 0) {
    alert("Digite um valor válido para saque!");
    return;
  }

  if (amount > balance) {
    alert("Saldo insuficiente!");
    return;
  }

  balance -= amount;
  updateBalance();
  addTransaction(`Saque de R$ ${amount.toFixed(2)}`);
  document.getElementById("amount").value = "";
}

function addTransaction(text) {
  let history = document.getElementById("transaction-history");
  let li = document.createElement("li");
  li.innerText = text;
  history.prepend(li);
}

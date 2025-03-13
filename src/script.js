// Carrega saldo e histórico do Local Storage ao iniciar
let saldo = parseFloat(localStorage.getItem("saldo")) || 100; // Saldo inicial
let historico = JSON.parse(localStorage.getItem("historico")) || [];

atualizarSaldo();
carregarHistorico();

function atualizarSaldo() {
  document.getElementById("saldo").innerText = `R$ ${saldo.toFixed(2)}`;
  localStorage.setItem("saldo", saldo); // Atualiza no Local Storage
}

function depositar() {
  let valor = parseFloat(document.getElementById("valor").value);

  if (isNaN(valor) || valor <= 0) {
    alert("Digite um valor válido para depósito!");
    return;
  }

  saldo += valor;
  atualizarSaldo();
  adicionarTransacao(`Depósito de R$ ${valor.toFixed(2)}`);
  document.getElementById("valor").value = "";
}

function sacar() {
  let valor = parseFloat(document.getElementById("valor").value);

  if (isNaN(valor) || valor <= 0) {
    alert("Digite um valor válido para saque!");
    return;
  }

  if (valor > saldo) {
    alert("Saldo insuficiente!");
    return;
  }

  saldo -= valor;
  atualizarSaldo();
  adicionarTransacao(`Saque de R$ ${valor.toFixed(2)}`);
  document.getElementById("valor").value = "";
}

function adicionarTransacao(descricao) {
  let dataHora = new Date().toLocaleString();
  let novaTransacao = `${descricao} - ${dataHora}`;

  historico.unshift(novaTransacao); // Adiciona ao início da lista
  localStorage.setItem("historico", JSON.stringify(historico)); // Salva no Local Storage

  carregarHistorico(); // Atualiza a lista na tela
}

function carregarHistorico() {
  let listaHistorico = document.getElementById("historico-transacoes");
  listaHistorico.innerHTML = ""; // Limpa a lista antes de recriar

  historico.forEach((transacao) => {
    let li = document.createElement("li");
    li.innerText = transacao;
    listaHistorico.appendChild(li);
  });
}

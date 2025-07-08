let emogis = [
  "😎",
  "😎",
  "🤩",
  "🤩",
  "😝",
  "😝",
  "😍",
  "😍",
  "🤑",
  "🤑",
  "🧐",
  "🧐",
];

let listaItens = [0, 0, 0, 0, 0, 0];

let fase = 1;

let vidaInfectada = 0;
let vida = 3;
let vidaMax = vida;
let pontos = 0;
let match = 0;
let matchPonto = 0;
let emogiMal = 0;

let emogiOpen = [];

let slot1 = document.getElementById("item1");
slot1.onclick = () => usarSlot(1);
let slot2 = document.getElementById("item2");
slot2.onclick = () => usarSlot(2);
let slot3 = document.getElementById("item3");
slot3.onclick = () => usarSlot(3);
let slot4 = document.getElementById("item4");
slot4.onclick = () => usarSlot(4);
let slot5 = document.getElementById("item5");
slot5.onclick = () => usarSlot(5);

requestAnimationFrame(verVida);
requestAnimationFrame(verPontos);
requestAnimationFrame(verItens);

iniciar();

function iniciar() {
  if (fase === 1) {
    emogis.push("👿", "👹"); // Adiciona emogis ruins na fase 1
  }
  if (fase === 2) {
    emogis.push("👺", "🤬", "😈"); // Adiciona mais emogis ruins na fase 2
    emogis.push("😏", "😏", "🙄", "🙄", "😛", "😛"); // Adiciona mais emogis divertidos na fase 2
    emogis = emogis.filter((emogi) => emogi !== "😍");
  }
  if (fase === 3) {
    emogis.push("🗿", "🗿", "👹");
    emogis.push("🎁", "😶", "😶", "😑", "😑", "😐", "😐");
    emogis = emogis.filter(
      (emogi) => emogi !== "😝" && emogi !== "🤩" && emogi !== "🤑"
    );
  }

  let emogisAleatorio = emogis.sort(() => Math.random() - 0.5);

  document.querySelector(".jogo").innerHTML = ""; // Limpa o jogo antes de iniciar

  for (let i = 0; i < emogisAleatorio.length; i++) {
    let box = document.createElement("div");
    box.classList.add("item");
    // box.className = "iten";
    box.innerHTML = emogisAleatorio[i];
    box.onclick = clickCard;
    document.querySelector(".jogo").appendChild(box);

    setTimeout(() => {
      box.classList.toggle("virarNoComeco");
    }, 10); // 10 ms é o suficiente
  }

  if (vida + vidaInfectada <= 1) {
    vida = 2;
  }

  match = 0;
  matchPonto = 0;

  requestAnimationFrame(verPontos);
  requestAnimationFrame(verVida);
  requestAnimationFrame(verItens);
}

function clickCard() {
  if (
    this.classList.contains("match") ||
    this.classList.contains("emogiMal") ||
    this.classList.contains("presente") ||
    this.classList.contains("rocha")
  ) {
    return; // Se já for um par, não faz nada
  }
  if (emogiOpen.length < 2) {
    emogiOpen.push(this);
    this.classList.toggle("virado");
  }
  if (emogiOpen.length == 2) {
    setTimeout(chackMatch, 500);
  }
}

function chackMatch() {
  if (
    emogiOpen[0].innerHTML == "👿" ||
    emogiOpen[0].innerHTML == "😈" ||
    emogiOpen[0].innerHTML == "👹" ||
    emogiOpen[0].innerHTML == "👺" ||
    emogiOpen[0].innerHTML == "🤬"
  ) {
    emogiOpen[0].classList.add("emogiMal");
    emogiMal++;

    if (vidaInfectada > 0) {
      vidaInfectada--;
    } else {
      vida--;
    }
  }

  if (
    emogiOpen[1].innerHTML == "👿" ||
    emogiOpen[1].innerHTML == "😈" ||
    emogiOpen[1].innerHTML == "👹" ||
    emogiOpen[1].innerHTML == "👺" ||
    emogiOpen[1].innerHTML == "🤬"
  ) {
    emogiOpen[1].classList.add("emogiMal");
    emogiMal++;

    if (vidaInfectada > 0) {
      vidaInfectada--;
    } else {
      vida--;
    }
  }

  if (emogiOpen[0].innerHTML === "🎁") {
    emogiOpen[0].classList.add("presente");
    gerarItem();
  }
  if (emogiOpen[1].innerHTML === "🎁") {
    emogiOpen[1].classList.add("presente");
    gerarItem();
  }

  if (emogiOpen[0].innerHTML === "🗿") {
    emogiOpen[0].classList.add("rocha");
  }
  if (emogiOpen[1].innerHTML === "🗿") {
    emogiOpen[1].classList.add("rocha");
  }

  if (emogiOpen[0] === emogiOpen[1]) {
    emogiOpen = [];
    return; // Se os dois cards forem o mesmo, não faz nada
  }
  if (emogiOpen[0].innerHTML === emogiOpen[1].innerHTML) {
    emogiOpen[0].classList.add("match");
    emogiOpen[1].classList.add("match");
    match++;
    matchPonto++;
    pontos += 10;
  } else {
    if (emogiOpen[0].classList.contains("emogiMal")) {
    } else if (emogiOpen[0].classList.contains("presente")) {
    } else if (emogiOpen[0].classList.contains("rocha")) {
    } else {
      emogiOpen[0].classList.remove("virado");
    }

    if (emogiOpen[1].classList.contains("emogiMal")) {
    } else if (emogiOpen[1].classList.contains("presente")) {
    } else if (emogiOpen[1].classList.contains("rocha")) {
    } else {
      emogiOpen[1].classList.remove("virado");
    }
  }
  emogiOpen = [];
}

function verVida() {
  if (vida == 3) {
    document.getElementById("coracao3").classList = "coracao";
    document.getElementById("coracao2").classList = "coracao";
    document.getElementById("coracao1").classList = "coracao";
  } else if (vida == 2) {
    if (!document.getElementById("coracao3").classList.contains("infectado")) {
      document.getElementById("coracao3").classList = "quebrado";
    }

    document.getElementById("coracao2").classList = "coracao";
    document.getElementById("coracao1").classList = "coracao";
  } else if (vida == 1) {
    if (!document.getElementById("coracao3").classList.contains("infectado")) {
      document.getElementById("coracao3").classList = "quebrado";
    }
    if (!document.getElementById("coracao2").classList.contains("infectado")) {
      document.getElementById("coracao2").classList = "quebrado";
    }
    document.getElementById("coracao1").classList = "coracao";
  } else if (vida == 0) {
    if (!document.getElementById("coracao3").classList.contains("infectado")) {
      document.getElementById("coracao3").classList = "quebrado";
    }
    if (!document.getElementById("coracao2").classList.contains("infectado")) {
      document.getElementById("coracao2").classList = "quebrado";
    }
    if (!document.getElementById("coracao1").classList.contains("infectado")) {
      document.getElementById("coracao1").classList = "quebrado";
    }

    setTimeout(() => {
      document.getElementById("morte").classList.add("mensagem");
      document.getElementById(
        "morte"
      ).innerHTML = `Você perdeu!<br>Você fez ${pontos} pontos!<br>Você encontrou ${match} pares!<br>Você encontrou ${emogiMal} emogis ruins!`;
    }, 250);
    setTimeout(() => {
      window.location.reload();
    }, 5000);

    return;
  }
  requestAnimationFrame(verVida);
}

function verPontos() {
  requestAnimationFrame(verItens);
  if (match == 6) {
    fase++;
    document.getElementById("morte").classList.add("mensagem");
    document.getElementById("morte").innerHTML = ` Você completou a fase ${
      fase - 1
    }!<br>Você fez ${pontos} pontos!<br>Você encontrou ${match} pares!<br>Você encontrou ${emogiMal} emogis ruins!<br>Prepare-se para a próxima!`;
    setTimeout(iniciar(), 5000);
    setTimeout(() => {
      document.getElementById("morte").classList.remove("mensagem");
      document.getElementById("morte").innerHTML = "";
    }, 5000);

    return;
  }
  requestAnimationFrame(verPontos);
}

function verItens() {
  if (matchPonto == 2) {
    gerarItem();
    matchPonto = 0;
  }
  requestAnimationFrame(verItens);
}

function gerarItem() {
  let numero = Math.floor(Math.random() * 3) + 1; // Gera um número aleatório entre 1 e 3
  if (numero === 1) {
    for (let i = 0; i < listaItens.length; i++) {
      if (listaItens[i] === 0) {
        listaItens[i] = 1;
        document.getElementById(`item${i + 1}`).classList.add("consertar");
        break;
      }
    }
  }
  if (numero === 2) {
    for (let i = 0; i < listaItens.length; i++) {
      if (listaItens[i] === 0) {
        listaItens[i] = 2;
        document.getElementById(`item${i + 1}`).classList.add("infecsão");
        break;
      }
    }
  }
  if (numero === 3) {
    for (let i = 0; i < listaItens.length; i++) {
      if (listaItens[i] === 0) {
        listaItens[i] = 3;
        document.getElementById(`item${i + 1}`).classList.add("lupa");
        break;
      }
    }
  }
}

function usarSlot(slot) {
  if (listaItens[slot - 1] === 1) {
    usarConsertar();
    listaItens[slot - 1] = 0;
    document.getElementById(`item${slot}`).classList.remove("consertar");
    return;
  }
  if (listaItens[slot - 1] === 2) {
    usarInfecsão();
    listaItens[slot - 1] = 0;
    document.getElementById(`item${slot}`).classList.remove("infecsão");
    return;
  }
  if (listaItens[slot - 1] === 3) {
    usarLupa();
    listaItens[slot - 1] = 0;
    document.getElementById(`item${slot}`).classList.remove("lupa");
    return;
  }
}

function usarConsertar() {
  if (vida >= vidaMax) {
    return; // Não faz nada se a vida já estiver no máximo
  } else if (vidaInfectada > 0) {
    vida = vidaMax;
    document.getElementById(`coracao4`).classList.add("infectado");
  } else {
    vida = vidaMax;
  }
}

function usarInfecsão() {
  document.getElementById(`coracao${vida + 1}`).classList.add("infectado");
  vidaInfectada += 2;
  requestAnimationFrame(verInfecsao);
  document.getElementById(`coracao${vida}`).classList.remove("quebrado");
}

function verInfecsao() {
  if (vidaInfectada == 0) {
    document.getElementById(`coracao${vida + 1}`).classList.remove("infectado");
    document.getElementById(`coracao${vida}`).classList.add("quebrado");
    return;
  }
  requestAnimationFrame(verInfecsao);
}

function usarLupa() {
  let emogi = document.querySelectorAll(".jogo .item");
  for (let i = 0; i < emogi.length; i++) {
    if (!emogi[i].classList.contains("match")) {
      emogi[i].classList.add("lupaAtivo");
    }
  }
  setTimeout(() => {
    for (let i = 0; i < emogi.length; i++) {
      emogi[i].classList.remove("lupaAtivo");
    }
  }, 2000);
}

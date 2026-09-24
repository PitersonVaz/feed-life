// Gera um protocolo único para cada doação
function gerarProtocolo() {

    let ultimoProtocolo =
        Number(localStorage.getItem("ultimoProtocolo")) || 0;

    ultimoProtocolo++;

    localStorage.setItem(
        "ultimoProtocolo",
        ultimoProtocolo
    );

    return `FL-${String(ultimoProtocolo).padStart(6, "0")}`;
}

// Salva uma nova doação
function salvarDoacao(doacao) {

    const doacoes =
        JSON.parse(localStorage.getItem("doacoes")) || [];

    const novaDoacao = {
        ...doacao,
        protocolo: gerarProtocolo()
    };

    doacoes.push(novaDoacao);

    localStorage.setItem(
        "doacoes",
        JSON.stringify(doacoes)
    );

    return novaDoacao;
}

// Salva um novo voluntário
function salvarVoluntario(voluntario) {

    const voluntarios =
        JSON.parse(localStorage.getItem("voluntarios")) || [];

    voluntarios.push(voluntario);

    localStorage.setItem(
        "voluntarios",
        JSON.stringify(voluntarios)
    );

    return voluntario;
}

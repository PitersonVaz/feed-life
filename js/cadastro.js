// Elementos principais do formulário
const formulario = document.querySelector("#form-cadastro");
const mensagemCadastro = document.querySelector("#mensagem-cadastro");

const tipoCadastro = document.querySelector("#tipo-cadastro");
const dadosCadastro = document.querySelector("#dados-cadastro");

const camposDoacao = document.querySelector("#campos-doacao");
const camposVoluntario = document.querySelector("#campos-voluntario");

const tipoDoacao = document.querySelector("#tipo-doacao");
const itemDoacao = document.querySelector("#item-doacao");
const quantidade = document.querySelector("#quantidade");
const validade = document.querySelector("#validade");

const areaInteresse = document.querySelector("#area-interesse");
const disponibilidade = document.querySelector("#disponibilidade");

const cpf = document.querySelector("#cpf");
const telefone = document.querySelector("#telefone");
const cep = document.querySelector("#cep");


// Esconde os campos no início
dadosCadastro.style.display = "none";
camposDoacao.style.display = "none";
camposVoluntario.style.display = "none";


// Mostra os campos de acordo com o tipo de cadastro
function mostrarTipoCadastro() {

    const tipo = tipoCadastro.value;

    mensagemCadastro.textContent = "";

    if (tipo === "") {dadosCadastro.style.display = "none";
        camposDoacao.style.display = "none";
        camposVoluntario.style.display = "none";

        return;
    }

    dadosCadastro.style.display = "block";

    if (tipo === "doacao") {camposDoacao.style.display = "block";
        camposVoluntario.style.display = "none";
        tipoDoacao.required = true;
        itemDoacao.required = true;
        quantidade.required = true;
        areaInteresse.required = false;
        disponibilidade.required = false;

    } 
    else if (tipo === "voluntario") {camposDoacao.style.display = "none";
        camposVoluntario.style.display = "block";
        tipoDoacao.required = false;
        itemDoacao.required = false;
        quantidade.required = false;
        validade.required = false;
        areaInteresse.required = true;
        disponibilidade.required = true;
    }
}

// Define quando a validade do alimento é obrigatória
function atualizarValidade() {
    if (tipoDoacao.value === "alimento") {
        validade.required = true;
    } 
    else {
        validade.required = false;
    }
}

// Máscara do CPF
cpf.addEventListener("input", function () {
    let valor = cpf.value.replace(/\D/g, "");
    valor = valor.slice(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    cpf.value = valor;
});

// Máscara do telefone
telefone.addEventListener("input", function () {
    let valor = telefone.value.replace(/\D/g, "");
    valor = valor.slice(0, 11);
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d{5})(\d{4})$/, "$1-$2");
    telefone.value = valor;
});

// Máscara do CEP
cep.addEventListener("input", function () {
    let valor = cep.value.replace(/\D/g, "");
    valor = valor.slice(0, 8);
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
    cep.value = valor;
});

// Eventos dos campos
tipoCadastro.addEventListener("change", mostrarTipoCadastro);
tipoDoacao.addEventListener("change", atualizarValidade);

// Envio do formulário
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    mensagemCadastro.textContent = "";
    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        mensagemCadastro.textContent =
            "Verifique os campos obrigatórios antes de continuar.";
        return;
    }

    const dadosPessoa = {
        nome: document.querySelector("#nome").value,
        email: document.querySelector("#email").value,
        cpf: cpf.value,
        telefone: telefone.value,
        cep: cep.value,
        endereco: document.querySelector("#endereco").value,
        cidade: document.querySelector("#cidade").value,
        estado: document.querySelector("#estado").value,
        numero: document.querySelector("#numero").value,
        complemento: document.querySelector("#complemento").value
    };

    // Cadastro de doação
    if (tipoCadastro.value === "doacao") {
        const doacao = {
            ...dadosPessoa,
            tipoDoacao: tipoDoacao.value,
            item: itemDoacao.value,
            quantidade: quantidade.value,
            validade: validade.value
        };

        const doacaoSalva = salvarDoacao(doacao);
        mensagemCadastro.textContent =
            `Doação cadastrada com sucesso! Protocolo: ${doacaoSalva.protocolo}`;
    }

    // Cadastro de voluntário
    if (tipoCadastro.value === "voluntario") {
        const voluntario = {
            ...dadosPessoa,
            areaInteresse: areaInteresse.value,
            disponibilidade: disponibilidade.value
        };

        salvarVoluntario(voluntario);
        mensagemCadastro.textContent =
            "Cadastro de voluntário realizado com sucesso!";
    }

});


//projetos da FEED LIFE
const projetos = [
    {
        id: "cozinha-comunitaria",
        titulo: "Cozinha Comunitária",
        descricao:
            "A Cozinha Comunitária tem como objetivo preparar e distribuir refeições para pessoas que precisam de apoio.",
        detalhes:
            "O projeto conta com a participação de voluntários no preparo, organização e distribuição das refeições."
    },
    {
        id: "arrecadacao-alimentos",
        titulo: "Arrecadação de Alimentos",
        descricao:
            "O projeto de arrecadação busca reunir alimentos para apoiar famílias e pessoas atendidas pela FEED LIFE.",
        detalhes:
            "As doações podem ser realizadas por pessoas, empresas, mercados e outros parceiros interessados em contribuir."
    }
];


//criar cada projeto na página
function criarProjeto(projeto) {
    const artigo = document.createElement("article");
    artigo.id = projeto.id;
    artigo.innerHTML = `
        <h3>${projeto.titulo}</h3>

        <p>${projeto.descricao}</p>

        <p>${projeto.detalhes}</p>
    `;
    return artigo;
}

// Adiciona os projetos
const listaProjetos = document.querySelector("#lista-projetos");
listaProjetos.innerHTML = "";

projetos.forEach(function (projeto) {const artigoProjeto = criarProjeto(projeto);
    listaProjetos.appendChild(artigoProjeto);
});


// navegação da página
const linksNavegacao = document.querySelectorAll("nav a");

linksNavegacao.forEach(function (link) {
    
    link.addEventListener("click", function (evento) {const destino = link.getAttribute("href");

        if (!destino.startsWith("#")) {return;
        }
        evento.preventDefault();

        if (destino === "#") {return;
        }
        const elementoDestino = document.querySelector(destino);

        if (!elementoDestino) {return;
        }
        const secoes = document.querySelectorAll("main section");

        secoes.forEach(function (secao) {secao.style.display = "none";
        });

        const secaoDestino = elementoDestino.closest("section");

        if (secaoDestino) {secaoDestino.style.display = "block";

            if (elementoDestino.tagName === "ARTICLE") {

                const artigos = secaoDestino.querySelectorAll("article");

                artigos.forEach(function (artigo) {artigo.style.display = "none";
                });

                elementoDestino.style.display = "block";
            }
        }

    });

});

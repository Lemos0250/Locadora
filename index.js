"use strict";
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    //resume o domcumento .query Selector Evitando utilizar várias vezes o Seletor. Retorna um elemento ou Nulo
    function locadora() {
        function ler() { }
        function adicionar(Filme) {
            var _a;
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${Filme.nome_filme}</td>
        <td>${Filme.nome_pessoa}</td>
        <td>${Filme.alugado}</td>
        <td>
        <button class="delete" data-aluguel="${Filme.nome_filme}">X</button>
        </td>
        `;
            (_a = $("#locadora")) === null || _a === void 0 ? void 0 : _a.appendChild(row);
        }
        function remover() { }
        function salvar() { }
        function render() { }
        return { ler, adicionar, remover, salvar, render };
    }
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const nome_pessoa = (_a = $("#nome_pessoa")) === null || _a === void 0 ? void 0 : _a.value;
        const nome_filme = (_b = $("#nome_filme")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome_pessoa || !nome_filme) {
            alert("Obrigatório o Seu Nome e o Filme Escolhido para Alugar, Favor insira corretamente os Dados");
            return;
        }
        locadora().adicionar({ nome_pessoa, nome_filme, alugado: new Date });
    });
})();

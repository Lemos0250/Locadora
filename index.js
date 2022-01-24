(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    //resume o domcumento .query Selector Evitando utilizar várias vezes o Seletor. Retorna um elemento ou Nulo
    function calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    }
    function locadora() {
        function ler() {
            return localStorage.locadora ? JSON.parse(localStorage.locadora) : [];
        }
        function salvar(Filme) {
            localStorage.setItem("locadora", JSON.stringify(Filme));
        }
        function adicionar(Filme, salva) {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${Filme.nome_filme}</td>
        <td>${Filme.nome_pessoa}</td>
        <td>${Filme.alugado}</td>
        <td>
         <button class="delete" data-alugado="${Filme.nome_filme}">X</button>
        </td>
        `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.nome_filme);
            });
            (_b = $("#locadora")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar([...ler(), Filme]);
        }
        function remover(nome_filme) {
            const { alugado, nome_pessoa } = ler().find((Filme) => Filme.nome_filme === nome_filme);
            const tempo = calcTempo(new Date().getTime() - new Date(alugado).getTime());
            if (!confirm(`O filme ${nome_filme} está alugado a ${tempo} Deseja Devolver?`))
                return;
            salvar(ler().filter((Filme) => Filme.nome_filme !== nome_filme));
            render();
        }
        function render() {
            $("#locadora").innerHTML = "";
            const locadora = ler();
            if (locadora.length) {
                locadora.forEach((Filme) => adicionar(Filme));
            }
        }
        return { ler, adicionar, remover, salvar, render };
    }
    locadora().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const nome_pessoa = (_a = $("#nome_pessoa")) === null || _a === void 0 ? void 0 : _a.value;
        const nome_filme = (_b = $("#nome_filme")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome_pessoa || !nome_filme) {
            alert("Obrigatório o Seu Nome e o Filme Escolhido para Alugar, Favor insira corretamente os Dados");
            return;
        }
        locadora().adicionar({ nome_pessoa, nome_filme, alugado: new Date().toISOString() }, true);
    });
})();

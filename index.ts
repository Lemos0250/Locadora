interface filme {
    nome_pessoa: string;
    nome_filme: string;
    alugado: Date | string;
}

(function() { 
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);
    //resume o domcumento .query Selector Evitando utilizar várias vezes o Seletor. Retorna um elemento ou Nulo

    function calcTempo(mil: number) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);

        return `${min}m e ${sec}s`;
    }

    function locadora(){
        function ler(): filme[] {
            return localStorage.locadora ? JSON.parse(localStorage.locadora) : [];
        }

        function salvar(Filme: filme[]) {
            localStorage.setItem("locadora", JSON.stringify(Filme));
        }

        function adicionar(Filme: filme, salva?: boolean){
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${Filme.nome_filme}</td>
        <td>${Filme.nome_pessoa}</td>
        <td>${Filme.alugado}</td>
        <td>
         <button class="delete" data-alugado="${Filme.nome_filme}">X</button>
        </td>
        `;

        row.querySelector(".delete")?.addEventListener("click", function() {
            remover(this.dataset.nome_filme);
        });

         $("#locadora")?.appendChild(row);

         if (salva) salvar([...ler(), Filme]);
        }

        function remover(nome_filme: string) {

            const { alugado, nome_pessoa} = ler().find((Filme) => Filme.nome_filme === nome_filme);

            const tempo = calcTempo(
                new Date().getTime() - new Date(alugado).getTime());

            if (
                !confirm(`O filme ${nome_filme} está alugado a ${tempo} Deseja Devolver?`))
            return;

            salvar(ler().filter((Filme) => Filme.nome_filme !== nome_filme));
            render();
        }

        function render() {
            $("#locadora")!.innerHTML = "";
            const locadora = ler();

            if(locadora.length) {
                locadora.forEach((Filme) => adicionar(Filme));
            }
        }

        return{ ler, adicionar, remover, salvar, render };
    }

    locadora().render();

    $("#cadastrar")?.addEventListener("click", () => {
        const nome_pessoa = $("#nome_pessoa")?.value;
        const nome_filme = $("#nome_filme")?.value;
        
        if (!nome_pessoa || !nome_filme) {
            alert("Obrigatório o Seu Nome e o Filme Escolhido para Alugar, Favor insira corretamente os Dados");
            return;
        }

        locadora().adicionar({ nome_pessoa, nome_filme, alugado: new Date().toISOString() }, true);
    });
})();

interface Filme {
    nome_pessoa: string;
    nome_filme: string;
    alugado: Date;
}

(function() { 
    const $ = (query: string): HTMLInputElement | null => document.querySelector(query);
    //resume o domcumento .query Selector Evitando utilizar várias vezes o Seletor. Retorna um elemento ou Nulo

    function locadora(){
        function ler(){}

        function adicionar(Filme: Filme){
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${Filme.nome_filme}</td>
        <td>${Filme.nome_pessoa}</td>
        <td>${Filme.alugado}</td>
        <td>
        <button class="delete" data-aluguel="${Filme.nome_filme}">X</button>
        </td>
        `;

         $("#locadora")?.appendChild(row);
        }
        function remover(){}

        function salvar(){}

        function render(){}

        return{ler,adicionar,remover,salvar,render};
    }

    $("#cadastrar")?.addEventListener("click", () => {
        const nome_pessoa = $("#nome_pessoa")?.value;
        const nome_filme = $("#nome_filme")?.value;
        
        if(!nome_pessoa || !nome_filme) {
            alert("Obrigatório o Seu Nome e o Filme Escolhido para Alugar, Favor insira corretamente os Dados");
            return;
        }

        locadora().adicionar({ nome_pessoa, nome_filme, alugado: new Date});
    });
})();

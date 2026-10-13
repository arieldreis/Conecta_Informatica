async function testeApi(){
    const fetchAPi = await fetch("http://localhost:3000/produtos");
    const JsonApi = await fetchAPi.json();
    const quantidade = JsonApi.length;
    const estoque = JsonApi.reduce((acumulador, obj) => acumulador + obj.quantidade, 0);
    const estoque_baixo = JsonApi.filter(p => p.quantidade < 1).length;
    console.log(JsonApi);
    console.log("Produtos Cadastrados: ", quantidade);
    console.log("EsTOQUE: ", estoque);
    console.log("Abaixo: ", estoque_baixo)
}

// Calling the function 
testeApi();
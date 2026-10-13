async function testeApi(){
    const fetchAPi = await fetch("http://localhost:3000/produtos");
    const JsonApi = await fetchAPi.json();
    
    const produtosRecentes = [...JsonApi]
    .sort((a, b) => Number(b.idProduto) - Number(a.idProduto))
    .slice(0, 3);

    const teste = [...JsonApi]
    console.log(teste);

    console.log(produtosRecentes);
}

// Calling the function 
testeApi();
async function testeApi(){
    const fetchAPi = await fetch("http://localhost:3000/produtos");
    const JsonApi = await fetchAPi.json();
    
    const categorias = JsonApi.map((a) => a.categoria);
    console.log(categorias);
}

// Calling the function 
testeApi();
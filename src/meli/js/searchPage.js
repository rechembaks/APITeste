var product = [];
var returnSearch = document.getElementById('return-search');
let searchBtn = document.querySelector("#search-mlb-btn");
searchBtn.addEventListener('click', function(){
    let mlb = document.getElementById('search-mlb');
    if(mlb.value == ""){
        document.getElementById('return-search').innerHTML = "O campo de busca não pode estar em branco!";
        returnSearch.style.color = "#FF0000";
        returnSearch.style.marginBottom = "50px";
    }
    else{
        searcheMLB(mlb.value)
        if(product == "not_found" || product == "resource not found"){
            console.log("Este é o MLB buscado: "+mlb.value);
            console.log("A consulta retornou: "+ product);
            document.getElementById('return-search').innerHTML = "Verifique o MLB inserido, produto não encontrado.";
            returnSearch.style.color = "#FF0000";
            returnSearch.style.marginBottom = "50px";
        }else{
            document.getElementById('return-search').innerHTML = " ";
            window.open ("productDetails.html?mlb="+mlb.value, '_blank');
        }
    }
    
});

function get(url){
    let rquest = new XMLHttpRequest()
    rquest.open("GET", url, false)
    rquest.send()
    return rquest.responseText
}

function searcheMLB(mlbn){
    product = JSON.parse(get("https://api.mercadolibre.com/items/"+mlbn));
    let table = document.getElementById("product-details");
    product = product.error;
    console.log(product);
    return(mlbn);
}
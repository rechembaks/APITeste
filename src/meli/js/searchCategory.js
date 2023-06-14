var product = [];
var returnSearch = document.getElementById('return-search');
let mlb;
let searchBtn = document.querySelector("#search-mlb-btn");

document.addEventListener('keypress', function(e){
    if(e.which == 13){
       verifyNGo();
    }
 }, false);

searchBtn.addEventListener('click', function(){
   verifyNGo();
});

function verifyNGo(){
    mlb = document.getElementById('search-mlb');
    if(mlb.value == ""){
        document.getElementById('return-search').innerHTML = "Preencha o MLB da categoria!";
        returnSearch.style.color = "white";
    }
    else{
        mlb = mlb.value.replace(/-/g, "");
        searcheMLB()
        if(product == "not_found" || product == "resource not found"){
            document.getElementById('return-search').innerHTML = "Categoria não encontrada.";
            returnSearch.style.color = "white";
            returnSearch.style.marginBottom = "50px";
        }else{
            document.getElementById('return-search').innerHTML = " ";
            window.open ("category-details.html?mlb="+mlb, '_blank');
        }
    } 
}


function get(url){
    let rquest = new XMLHttpRequest()
    rquest.open("GET", url, false)
    rquest.send()
    return rquest.responseText
}

function searcheMLB(){
    product = JSON.parse(get("https://api.mercadolibre.com/categories/"+mlb));
    product = product.error;
}
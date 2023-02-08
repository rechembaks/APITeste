var product = [];
var requestProduct = "";
var url_string = window.location.href;
var url = new URL(url_string);
var mlb = url.searchParams.get("mlb");
var variationsLength = 0;
var link = "";
var categoryName = "";
var pathCategory = "";

//This button, leaves the page and redirect to "search page"
var newSearchBtn = document.querySelector("#new-search");
newSearchBtn.addEventListener('click', function(){
    window.location = "searchPage.html";
})

//This button, refresh the actual page with a new request
var refreshBtn = document.querySelector("#refresh");
refreshBtn.addEventListener('click', function(){
    location.reload();
});

//This button opens a new page with the ad details on the "Meli" website
var btnAnnouncement = document.querySelector('#link');
btnAnnouncement.addEventListener('click', function(){
    var win = window.open(link, '_blank');
    win.focus();
});

var btnRequest = document.querySelector('#link-requisition');
btnRequest.addEventListener('click', function(){
    link = "https://api.mercadolibre.com/items/"+mlb;
    var win = window.open(link, '_blank');
    win.focus();
});


function get(url){
    let rquest = new XMLHttpRequest()
    rquest.open("GET", url, false)
    rquest.send()
    return rquest.responseText
}

searcheMLB(mlb);

function searcheMLB(mlbn){
    product = JSON.parse(get("https://api.mercadolibre.com/items/"+mlbn));
    console.log(product);
    requestProduct = JSON.stringify(product);
    let table = document.getElementById("product-details");
    getCategory(product.category_id)
    cretePage();
    product = product.variations;
    variationsLength = product.length;
    product.forEach(element => {
        let row = buildTable(element);
        table.appendChild(row);
    });
    return(mlbn);
}

function cretePage(){
    var category = document.getElementById('product-category').textContent = categoryName;
    var categoryPath = document.getElementById('product-category-path').textContent = pathCategory;
    var name = document.getElementById('name').value = product.title;
    var price = document.getElementById('product-price').textContent = "R$ " + product.price;
    var thumbnail = document.getElementById('thumbnail').src = product.thumbnail;
    link = product.permalink;
}




function buildTable(productTable){
    if(variationsLength > 0){ 
        let product_type = document.getElementById('product-type').textContent = "Produto com variações"
        //desoculta os títulos da tabela --> Início
        let table_id = document.getElementById('row-id').hidden=false;
        let table_fisrt_attribute = document.getElementById('row-fisrt-attribute').hidden=false;
        let table_stock = document.getElementById('row-stock').hidden=false;
        let table_price = document.getElementById('row-price').hidden=false;
        //desoculta os títulos da tabela --> Fim

        row = document.createElement("tr");
        var nameAttribute = document.getElementById('row-fisrt-attribute').textContent=productTable.attribute_combinations[0].name;
        tdId = document.createElement("td");
        tdId.innerHTML = productTable.id;
        tdId.classList.add("row-tr");
        row.appendChild(tdId);

        td_value_attribute_one = document.createElement("td");
        td_value_attribute_one.innerHTML = productTable.attribute_combinations[0].value_name;
        td_value_attribute_one.classList.add("row-tr");
        row.appendChild(td_value_attribute_one);

        if(variationsLength > 1){
            let table_second_attribute = document.getElementById('row-second-attribute').hidden=false;

            var nameAttribute = document.getElementById('row-second-attribute').textContent=productTable.attribute_combinations[1].name;
            td_value_attribute_two = document.createElement("td");
            td_value_attribute_two.innerHTML = productTable.attribute_combinations[1].value_name;
            td_value_attribute_two.classList.add("row-tr");
            row.appendChild(td_value_attribute_two);
        }

        td_stock = document.createElement("td");
        td_stock.innerHTML = productTable.available_quantity;
        td_stock.classList.add("row-tr");
        row.appendChild(td_stock);

        td_price = document.createElement("td");
        td_price.innerHTML = productTable.price;
        td_price.classList.add("row-tr");
        row.appendChild(td_price);
    }
    return row;
};


//Categorys

function getCategory(cmlb){
    category = JSON.parse(get("https://api.mercadolibre.com/categories/"+cmlb));
    console.log(category);
    categoryAttributes = JSON.parse(get("https://api.mercadolibre.com/categories/"+cmlb+"/attributes"));
    requestProduct = JSON.stringify(category);
    getCategoryPath(category.path_from_root.length);
    categoryName = '"'+category.name+'"';
    return(cmlb);
}

function getCategoryPath(path_from_root){
    var path = "";
    for (let i = 0; i < path_from_root;i++){
        path = path + category.path_from_root[i].name + " > ";
    }
    paht = path.slice(0, -3);
    pathCategory = "(" + path.slice(0, -3)+")";
    return path;
}
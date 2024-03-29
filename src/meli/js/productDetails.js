var product = [];
var requestProduct = "";
var url_string = window.location.href;
var url = new URL(url_string);
var mlb = url.searchParams.get("mlb");
var variationsLength = 0;
var link = "";
var linkAnnouncement = ""
var categoryName = "";
var pathCategory = "";
var btnAnnouncement = document.querySelector('#link');

btnAnnouncement.addEventListener('click', function(){
    var win = window.open(linkAnnouncement, '_blank');
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
    var price = document.getElementById('product-price').textContent = product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});;
    var thumbnail = document.getElementById('thumbnail').src = product.thumbnail;
    var status = product.status;
    switch (status){
        case "active":
            status = document.getElementById('status').textContent = "Status: Ativo";
            break;
        case "closed":
            status = document.getElementById('status').textContent = "Status: Finalizado";
            break;
        case "inactive":
            status = document.getElementById('status').textContent = "Status: Inativo";
            break
        case "not_yet_active":
            status = document.getElementById('status').textContent = "Status: Aguardando Ativação";
            break;
        case "paused":
            status = document.getElementById('status').textContent = "Status: Inativo";
            break;
        case "payment_required":
            status = document.getElementById('status').textContent = "Conta com pendências";
            break;
        case "under_review":
            status = document.getElementById('status').textContent = "Status: Em Revisão";
            break;
    }
    linkAnnouncement = product.permalink;
}

function buildTable(productTable){
    if(variationsLength > 0){ 
        let product_type = document.getElementById('product-type').textContent = "Produto com variações"
        //desoculta os títulos da tabela --> Início
        let table_id = document.getElementById('row-id').hidden=false;
        let table_fisrt_attribute = document.getElementById('row-fisrt-attribute').hidden=false;
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
        if(productTable.attribute_combinations.length > 1){
            let table_second_attribute = document.getElementById('row-second-attribute').hidden=false;

            var nameAttribute = document.getElementById('row-second-attribute').textContent=productTable.attribute_combinations[1].name;
            td_value_attribute_two = document.createElement("td");
            td_value_attribute_two.innerHTML = productTable.attribute_combinations[1].value_name;
            td_value_attribute_two.classList.add("row-tr");
            row.appendChild(td_value_attribute_two);
        }

        if(productTable.attribute_combinations.length > 2){
            let table_third_attribute = document.getElementById('row-third-attribute').hidden=false;
            var nameAttribute = document.getElementById('row-third-attribute').textContent=productTable.attribute_combinations[2].name;
            td_value_attribute_tree = document.createElement("td");
            td_value_attribute_tree.innerHTML = productTable.attribute_combinations[2].value_name;
            td_value_attribute_tree.classList.add("row-tr");
            row.appendChild(td_value_attribute_tree);
        }
    }
    return row;
};
//Categorys
function getCategory(cmlb){
    category = JSON.parse(get("https://api.mercadolibre.com/categories/"+cmlb));
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
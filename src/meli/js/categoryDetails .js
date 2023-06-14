var categoryName = "";
var category = "";
var categoryAttributes = "";
var pathCategory = "";
var url_string = window.location.href;
var url = new URL(url_string);
var mlb = url.searchParams.get("mlb");

var btnRequest = document.querySelector('#link-requisition');
btnRequest.addEventListener('click', function(){
    link = "https://api.mercadolibre.com/categories/"+mlb+"/attributes";
    var win = window.open(link, '_blank');
    win.focus();
});

var btnAnnouncement = document.querySelector('#link');
btnAnnouncement.addEventListener('click', function(){
    window.location = "/src/meli/search-category.html";
    win.focus();
});

function get(url){
    let rquest = new XMLHttpRequest()
    rquest.open("GET", url, false)
    rquest.send()
    return rquest.responseText
}

getCategory(mlb);

function getCategory(cmlb){
    category = JSON.parse(get("https://api.mercadolibre.com/categories/"+cmlb));
    console.log(category);
    categoryAttributes = JSON.parse(get("https://api.mercadolibre.com/categories/"+cmlb+"/attributes"));
    console.log(categoryAttributes);
    getCategory = JSON.stringify(category);
    getCategoryPath(category.path_from_root.length);
    categoryName = category.name;

    console.log(categoryAttributes[0].name);
    let table = document.getElementById("category-details");
    categoryAttributes.forEach(element => {
        let row = buildTable(element);
        table.appendChild(row);
    });

    document.getElementById('category-name').setAttribute("value", categoryName);
    document.getElementById('category-path').innerHTML = pathCategory;
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

function buildTable(categoryTable){
        row = document.createElement("tr");
        tdId = document.createElement("td");
        tdId.innerHTML = categoryTable.id;
        tdId.classList.add("row-tr");
        row.appendChild(tdId);
        
        tdName = document.createElement("td");
        tdName.innerHTML = categoryTable.name;
        tdName.classList.add("row-tr");
        row.appendChild(tdName);

        tdHierarchy = document.createElement("td");
        tdHierarchy.innerHTML = categoryTable.hierarchy;
        switch(categoryTable.hierarchy)
        {
            case "CHILD_PK":
                tdHierarchy.innerHTML = "Variação";
                break;
            default:
                tdHierarchy.innerHTML = "Ficha técnica";
        }
        tdHierarchy.classList.add("row-tr");
        row.appendChild(tdHierarchy);

        tdDataType = document.createElement("td");
        tdDataType.innerHTML = categoryTable.value_type; 
        switch(categoryTable.value_type)
        {
            case "string":
                tdDataType.innerHTML = "Texto";
                break;
            case "number_unit":
                tdDataType.innerHTML = "Númerico";
                break;
            case "boolean":
                tdDataType.innerHTML = "Sim/Não";
                break;
            case "list":
                tdDataType.innerHTML = "Lista";
                break; 
        }
        tdDataType.classList.add("row-tr");
        row.appendChild(tdDataType);

        tdRequired = document.createElement("td");
        tdRequired.innerHTML = categoryTable.tags.catalog_required;
        if(categoryTable.tags.catalog_required == true){
            tdRequired.innerHTML = "Sim";
        }
        else{
            tdRequired.innerHTML = "Não";
        }
        tdRequired.classList.add("row-tr");
        row.appendChild(tdRequired);
    return row;
};



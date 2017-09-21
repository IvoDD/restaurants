function changeName(newName){
    $('#restaurant_name').text(newName);
}

var tabData = {"menu": "block_menu",
"orders": "block_orders"};
var lastTab = "menu";

function clearTab(tabName){
if (tabName==""){return;}
document.getElementById(tabName).className="";
document.getElementById(tabData[tabName]).style.display="none";
}

function changeTab(tabName){
clearTab(lastTab);
lastTab = tabName;
document.getElementById(tabName).className="active";
document.getElementById(tabData[tabName]).style.display="block";
}

function removeChildren(element){
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }
}

function ordersTR(order){
    let tr = document.createElement('tr');
    let td = [document.createElement('td'),document.createElement('td'),document.createElement('td')];
    td[0].appendChild(document.createTextNode(order.orderer));
    td[1].appendChild(document.createTextNode(order.name));
    td[2].appendChild(document.createTextNode(order.price));
    for (let i = 0; i < td.length; i++){
        tr.appendChild(td[i]);
    }
    return tr;
}

function createOrdersTable(){
    let ordersBody = document.getElementById('orders_table_body');
    removeChildren(ordersBody);
    for (let ord of orders){
        ordersBody.appendChild(ordersTR(ord));
    }
}

function updateOrdersTable(order){
    document.getElementById('orders_table_body').appendChild(ordersTR(order));
}
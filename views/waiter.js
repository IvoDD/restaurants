var tabData = {"tables": "block_tables",
"orders": "block_orders", "login": "block_login"};
var lastTab = "tables";

function clearTab(tabName){
    if (tabName == ""){return;}
    $('#' + tabName).removeClass('active');
    $('#' + tabData[tabName]).css("display", "none");
}

function changeTab(tabName){
    clearTab(lastTab);
    lastTab = tabName;
    $('#' + tabName).addClass('active');
    $('#' + tabData[tabName]).css("display", "block");
}

function removeChildren(element){
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }
}

//
var socket = io();

socket.on('login', (user) => {
    if (user.id == -1){alert("Incorrect username or password");}
    else{
        changeTab("tables");
        $("#login").children().text("Hi, " + user.name);
    }
});

function login(){
    socket.emit("waiter_login", $("#inputUsername").val(), $("#inputPassword").val());
    return false;
}
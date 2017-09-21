var socket = io();
var url = window.location.href;
url = trim(url);
var currentMenu;
var orders = [];
var total = 0;

socket.emit('url', url);

socket.on('name', (name) => {
    changeName(name);
});

socket.on('init', (_menu, _orders) => {
    menu = _menu;
    orders = _orders;
    createOrdersTable();
    $('#menu-tree').treeview({
        data: [convertToTree(menu)],
        onNodeSelected: function (event, data){
            bootbox.confirm('Искам да поръчам ' + data.name + ' за ' + data.price + '!', function (result){
                if(result){
                    socket.emit('order', data.name);
                }
                $('#menu-tree').treeview('unselectNode', [ data.nodeId, { silent: true } ]);
            });
        }
    });
    socket.on('order', order => {
        orders.push(order);
        updateOrdersTable(order);
    });
});

function trim(url){
    let pos;
    for (pos = url.length; pos>=0; --pos){
        if (url[pos] == '/'){break;}
    }
    return url.substring(pos+1, url.length);
}